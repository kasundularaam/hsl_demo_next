"use client";

import { useInjection } from "@/injection/Injection";
import createAuthStatusLogic from "@/logic/authStatusLogic";
import React, { useContext, useEffect, useReducer, useState } from "react";
import AuthStatusAction, {
  AuthStatusAuthorizeAction,
  AuthStatusUnauthorizeAction,
} from "./AuthStatusAction";
import AuthStatusState, {
  AuthStatusAuthorizedState,
  AuthStatusUnauthorizedState,
} from "./AuthStatusState";

type AuthStatusContextType = {
  state: AuthStatusState;
  updateAuthStatus: ((status: AuthStatusState) => void) | undefined;
};

const AuthStatusContext = React.createContext<AuthStatusContextType>({
  state: false,
  updateAuthStatus: undefined,
});

function reducer(state: AuthStatusState, action: AuthStatusAction) {
  if (action instanceof AuthStatusAuthorizeAction) {
    return new AuthStatusAuthorizedState();
  }
  if (action instanceof AuthStatusUnauthorizeAction) {
    return new AuthStatusUnauthorizedState();
  }
  return new AuthStatusUnauthorizedState();
}

export function useAuthStatus() {
  return useContext(AuthStatusContext);
}

export default function AuthStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, false);
  const [updateAuthStatus, setUpdateAuthStatus] =
    useState<(status: AuthStatusState) => void>();

  const { authRepo } = useInjection();

  useEffect(() => {
    const isSignedIn = authRepo.isSignedIn();
    if (isSignedIn) {
      dispatch(new AuthStatusAuthorizedState());
    }
    const logic = createAuthStatusLogic(dispatch);
    setUpdateAuthStatus(logic);
  }, [authRepo]);

  return (
    <AuthStatusContext.Provider value={{ state, updateAuthStatus }}>
      {children}
    </AuthStatusContext.Provider>
  );
}
