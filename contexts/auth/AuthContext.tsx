"use client";

import createAuthLogics, { AuthLogics } from "@/logic/authLogics";
import AuthRepo from "@/repositories/AuthRepo";
import AuthService from "@/services/AuthService";
import React, { useContext, useEffect, useState } from "react";
import AuthAction, {
  AuthGetStatusAction,
  AuthLogInAction,
} from "./authActions";
import AuthState, { AuthInitialState } from "./AuthStates";

type AuthActionAndState = {
  action: AuthAction;
  state: AuthState;
};

const AuthContext = React.createContext<AuthActionAndState>({
  action: AuthGetStatusAction,
  state: AuthInitialState,
});

function reducer(state: AuthState, action: AuthAction) {
  const authService = new AuthService();
  const authRepo = new AuthRepo(authService);
  if (action instanceof AuthLogInAction) {
    try {
      const user = await authRepo.loginUser(action.email, action.password);
    } catch (error) {}
  }
  switch (action) {
    case AuthLogInAction:
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}

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
    setAuthLogicHooks(authLogics);
  }, []);

  return (
    <AuthContext.Provider value={authLogicHooks}>
      {children}
    </AuthContext.Provider>
  );
}
