"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutButton() {
  const { useIsSignedIn, useSignOut } = useAuth()!;

  const isSignedIn = useIsSignedIn();
  const signOutUser = useSignOut();

  const router = useRouter();
  const signOut = () => {
    signOutUser();
    router.replace("/");
  };
  return (
    <>
      {isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <Link href="/auth/login">Login</Link>
      )}
    </>
  );
}
