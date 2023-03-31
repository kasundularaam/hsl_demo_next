"use client";

import { useAuth, useUpdateAuthState } from "@/contexts/AuthContext";
import { signOutUser } from "@/services/auth_service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutButton() {
  const user = useAuth();
  const updateAuthState = useUpdateAuthState();
  const router = useRouter();
  const signOut = () => {
    try {
      signOutUser();
      updateAuthState(undefined);
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
