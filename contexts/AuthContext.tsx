"use client";

import createAuthLogics, { AuthLogics } from "@/logic/authLogics";
import AuthRepo from "@/repositories/AuthRepo";
import AuthService from "@/services/AuthService";
import React, { useContext, useEffect, useState } from "react";

let AuthContext = React.createContext<AuthLogics | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authLogicHooks, setAuthLogicHooks] = useState<AuthLogics>();
  useEffect(() => {
    const authService = new AuthService();
    const authRepo = new AuthRepo(authService);
    const authLogics = createAuthLogics(authRepo);
    setAuthLogicHooks(authLogics);
  }, []);

  return (
    <AuthContext.Provider value={authLogicHooks}>
      {children}
    </AuthContext.Provider>
  );
}
