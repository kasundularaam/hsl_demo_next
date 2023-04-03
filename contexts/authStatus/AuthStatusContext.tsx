"use client";

import { useInjection } from "@/injection/Injection";
import AuthStatusLogic from "@/logic/AuthStatusLogic";
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
  authStatusLogic: AuthStatusLogic | undefined;
};

const AuthStatusContext = React.createContext<AuthStatusContextType>({
  state: new AuthStatusUnauthorizedState(),
  authStatusLogic: undefined,
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
  const [state, dispatch] = useReducer(
    reducer,
    new AuthStatusUnauthorizedState()
  );

  const { authRepo } = useInjection();

  const authStatusLogic = new AuthStatusLogic(authRepo, dispatch);

  useEffect(() => {
    const isSignedIn = authRepo.isSignedIn();
    if (isSignedIn) {
      dispatch(new AuthStatusAuthorizeAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthStatusContext.Provider value={{ state, authStatusLogic }}>
      {children}
    </AuthStatusContext.Provider>
  );
}
