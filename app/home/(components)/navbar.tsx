"use client";

import Link from "next/link";
import { signOutUser } from "@/services/auth_service";
import { useAuth, useUpdateAuthState } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
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
    <div className="flex flex-row justify-between px-5 py-2">
      <Link href="/">Handicraft Sri Lanka</Link>
      <div className="flex flex-row gap-2">
        <Link href="/users">Users</Link>
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
}
