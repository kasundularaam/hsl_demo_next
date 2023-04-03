"use client";

import { useAuthStatus } from "@/logic/authStatusLogic/AuthStatusContext";
import { AuthStatusAuthorizedState } from "@/logic/authStatusLogic/AuthStatusState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignOutButton() {
  const { state, authStatusLogic } = useAuthStatus();

  const router = useRouter();

  const signOut = () => {
    authStatusLogic?.removeExistingUser();
    router.replace("/");
  };

  useEffect(() => {
    authStatusLogic?.loadAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
