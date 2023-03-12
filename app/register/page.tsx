"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [user, setUser] = useState({});

  const router = useRouter();

  const register = async (formData: FormData) => {
    const { name, email, password } = formData;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      setUser(res.data);

      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-gray-300">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          register(values as FormData);
        }}
      >
        <div className="flex flex-col m-auto bg-slate-700 p-20 rounded-lg">
          <Form className="flex flex-col m-auto p-7">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />

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
  );
}
