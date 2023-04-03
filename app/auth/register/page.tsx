"use client";

import { useAuthStatus } from "@/logic/authStatusLogic/AuthStatusContext";
import { useRegister } from "@/logic/registerLogic/RegisterContext";
import {
  RegisterFailedState,
  RegisterLoadingState,
  RegisterSucceedState,
} from "@/logic/registerLogic/RegisterState";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";
import { RegisterData } from "../(componentProps)/FormDataProps";

export default function RegisterPage() {
  const { state, registerLogic } = useRegister();
  const { authStatusLogic } = useAuthStatus();

  const router = useRouter();
  useEffect(() => {
    if (state instanceof RegisterSucceedState) {
      authStatusLogic?.saveNewUser(state.token, state.user._id);
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function register(data: RegisterData) {
    if (registerLogic === undefined) return;
    registerLogic.registerUser(data.name, data.email, data.password);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-5 gap-5 text-gray-300">
      <h1 className="text-green-500 text-center font-bold text-3xl">
        Register
      </h1>
      <div className="flex flex-col m-auto bg-slate-700 p-5 rounded-lg space-y-3">
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
            {state instanceof RegisterLoadingState ? (
              <div className="text-center">Loading...</div>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-green-500 p-2 text-white font-bold"
              >
                Submit
              </button>
            )}
            {state instanceof RegisterFailedState && (
              <div className="text-xs text-red-500 text-center">
                {state.errorMessage}
              </div>
            )}
          </Form>
        </Formik>

        <Link href="/auth/login" className="text-center">
          Login
        </Link>
      </div>
    </div>
  );
}
