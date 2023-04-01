"use client";

import { useInjection } from "@/injection/Injection";
import createAuthStatusLogic from "@/logic/authStatusLogic";
import React, { useContext, useEffect, useReducer } from "react";
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

  const { authRepo } = useInjection();

  const updateAuthStatus = createAuthStatusLogic(dispatch);

  useEffect(() => {
    const isSignedIn = authRepo.isSignedIn();
    if (isSignedIn) {
      dispatch(new AuthStatusAuthorizeAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthStatusContext.Provider value={{ state, updateAuthStatus }}>
      {children}
    </AuthStatusContext.Provider>
  );
}
