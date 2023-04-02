"use client";

import { useAuthStatus } from "@/contexts/authStatus/AuthStatusContext";
import { AuthStatusAuthorizedState } from "@/contexts/authStatus/AuthStatusState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutButton() {
  const { state, authStatusLogic } = useAuthStatus();

  const router = useRouter();

  const signOut = () => {
    if (authStatusLogic === undefined) return;
    authStatusLogic.removeExistingUser();
    router.replace("/");
  };

  return (
    <div>
      {state instanceof AuthStatusAuthorizedState ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <Link href="/auth/login">Login</Link>
      )}
    </div>
  );
}
