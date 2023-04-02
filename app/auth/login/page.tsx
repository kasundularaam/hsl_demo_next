"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { useRouter } from "next/navigation";

import * as Yup from "yup";
import Link from "next/link";
import { LoginData } from "../(componentProps)/FormDataProps";
import { useLogin } from "@/contexts/loginContext/LoginContext";
import {
  LoginFailedState,
  LoginLoadingState,
  LoginSucceedState,
} from "@/contexts/loginContext/LoginState";
import { useAuthStatus } from "@/contexts/authStatus/AuthStatusContext";
import { useEffect } from "react";

export default function LoginPage() {
  const { state, loginLogic } = useLogin();
  const { authStatusLogic } = useAuthStatus();

  const router = useRouter();
  useEffect(() => {
    if (state instanceof LoginSucceedState) {
      if (authStatusLogic === undefined) return;
      authStatusLogic.saveNewUser(state.token, state.user._id);
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function login(data: LoginData) {
    if (loginLogic === undefined) return;
    loginLogic.loginUser(data.email, data.password);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-5 gap-5 text-gray-300">
      <h1 className="text-green-500 text-center font-bold text-3xl">Login</h1>
      <div className="flex flex-col m-auto bg-slate-700 p-5 rounded-lg space-y-3">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            login(values as LoginData);
          }}
        >
          <Form className="flex flex-col gap-5 m-auto">
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
                className="bg-gray-600 rounded-md px-5 py-2"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="password" />
              </div>
            </div>
            {state instanceof LoginLoadingState ? (
              <div className="text-center">Loading... </div>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-green-500 p-2 text-white font-bold"
              >
                Submit
              </button>
            )}
            {state instanceof LoginFailedState && (
              <div className="text-xs text-red-500 text-center">
                {state.errorMessage}
              </div>
            )}
          </Form>
        </Formik>
        <Link href="/auth/register" className="text-center">
          Register
        </Link>
      </div>
    </div>
  );
}
