"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AuthLogics } from "@/logic/authLogics";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutButtonOk(authLogics: AuthLogics) {
  const { useIsSignedIn, useSignOut } = authLogics;

  const isSignedIn = useIsSignedIn();
  const isSignedOut = useSignOut();

  const router = useRouter();
  const signOut = () => {
    try {
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <Link href="/auth/login">Login</Link>
      )}
    </>
  );
}
