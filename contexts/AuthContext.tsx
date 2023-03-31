"use client";

import IUser from "@/models/IUser";
import { getUid, getUserByUid, isSignedIn } from "@/services/auth_service";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext<IUser | undefined>(undefined);
const AuthUpdateAuthStateContext = React.createContext<
  (value: IUser | undefined) => void
>((value: IUser | undefined) => {});

export function useAuth() {
  return useContext(AuthContext);
}

export function useUpdateAuthState() {
  return useContext(AuthUpdateAuthStateContext);
}

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const updateAuthState = (value: IUser | undefined) => {
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
