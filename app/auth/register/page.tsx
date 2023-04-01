"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { RegisterData } from "../(componentProps)/FormDataProps";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const register = async (formData: RegisterData) => {};

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-5 gap-5 text-gray-300">
      <h1 className="text-green-500 text-center font-bold text-3xl">
        Register
      </h1>
      <div className="flex flex-col m-auto bg-slate-700 p-5 rounded-lg">
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
            register(values as RegisterData);
          }}
        >
          <Form className="flex flex-col gap-5 m-auto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                className="bg-gray-600 rounded-md px-5 py-2 border-0"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className="bg-gray-600 rounded-md px-5 py-2 border-0"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className="bg-gray-600 rounded-md px-5 py-2 border-0"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="password" />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-md bg-green-500 p-2 text-white font-bold"
            >
              Submit
            </button>
            {error ? (
              <div className="text-xs text-red-500 text-center">{error}</div>
            ) : (
              <div></div>
            )}
          </Form>
        </Formik>
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
}
