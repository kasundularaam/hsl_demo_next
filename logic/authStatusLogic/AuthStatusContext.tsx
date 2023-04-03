"use client";

import { useInjection } from "@/injection/Injection";
import React, { useContext, useReducer } from "react";
import AuthStatusAction, {
  AuthStatusAuthorizeAction,
  AuthStatusUnauthorizeAction,
} from "./AuthStatusAction";
import AuthStatusLogic from "./AuthStatusLogic";
import AuthStatusState, {
  AuthStatusAuthorizedState,
  AuthStatusUnauthorizedState,
  AuthStatusUnknownState,
} from "./AuthStatusState";

type AuthStatusContextType = {
  state: AuthStatusState;
  authStatusLogic: AuthStatusLogic | undefined;
};

const AuthStatusContext = React.createContext<AuthStatusContextType>({
  state: new AuthStatusUnknownState(),
  authStatusLogic: undefined,
});

function reducer(state: AuthStatusState, action: AuthStatusAction) {
  if (action instanceof AuthStatusAuthorizeAction) {
    return new AuthStatusAuthorizedState();
  }
  if (action instanceof AuthStatusUnauthorizeAction) {
    return new AuthStatusUnauthorizedState();
  }
  return new AuthStatusUnknownState();
}

export function useAuthStatus() {
  return useContext(AuthStatusContext);
}

export default function AuthStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, new AuthStatusUnknownState());

  const { authRepo } = useInjection();

  const authStatusLogic = new AuthStatusLogic(authRepo, dispatch);

  return (
    <AuthStatusContext.Provider value={{ state, authStatusLogic }}>
      {children}
    </AuthStatusContext.Provider>
  );
}
