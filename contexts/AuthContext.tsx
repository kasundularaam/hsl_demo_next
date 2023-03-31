"use client";

import User from "@/models/user";
import { getUid, getUserByUid, isSignedIn } from "@/services/auth_service";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext<User | undefined>(undefined);
const AuthUpdateAuthStateContext = React.createContext<
  (value: User | undefined) => void
>((value: User | undefined) => {});

export function useAuth() {
  return useContext(AuthContext);
}

export function useUpdateAuthState() {
  return useContext(AuthUpdateAuthStateContext);
}

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const updateAuthState = (value: User | undefined) => {
    setUser(value);
  };

  useEffect(() => {
    const update = async () => {
      const hasUser = isSignedIn();
      if (hasUser) {
        try {
          const uid = getUid();
          const user = await getUserByUid(uid);
          updateAuthState(user);
        } catch (error) {
          console.error(error);
        }
      }
    };
    update();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <AuthUpdateAuthStateContext.Provider value={updateAuthState}>
        {children}
      </AuthUpdateAuthStateContext.Provider>
    </AuthContext.Provider>
  );
}
