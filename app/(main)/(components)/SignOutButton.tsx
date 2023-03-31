"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutButton() {
  const contextValue = useAuth();
  if (contextValue === undefined) {
    return null;
  }

  const { useIsSignedIn, useSignOut } = contextValue;

  const isSignedIn = useIsSignedIn();

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
