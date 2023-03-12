"use client";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { useRouter } from "next/navigation";

import { useState } from "react";
import * as Yup from "yup";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [user, setUser] = useState({});

  const router = useRouter();

  const login = async (formData: FormData) => {
    const { email, password } = formData;
    console.log(email, password);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        email: email,
        password: password,
      });
      setUser(res.data);
      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-5 gap-5 text-gray-300">
      <h1 className="text-green-500 text-center font-bold text-3xl">Login</h1>
      <div className="flex flex-col m-auto bg-slate-700 p-20 rounded-lg">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            login(values as FormData);
          }}
        >
          <div className="flex flex-col m-auto bg-slate-700 p-20 rounded-lg">
            <Form className="flex flex-col m-auto p-7">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />

              <button type="submit">Submit</button>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
}
