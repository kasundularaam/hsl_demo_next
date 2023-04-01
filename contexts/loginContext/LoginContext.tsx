"use client";

import { useInjection } from "@/injection/Injection";
import React, { useContext, useReducer } from "react";
import LoginAction, {
  LoginFailedAction,
  LoginStartedAction,
  LoginSucceedAction,
} from "./LoginAction";
import LoginState, {
  LoginFailedState,
  LoginInitState,
  LoginLoadingState,
  LoginSucceedState,
} from "./LoginState";

type LoginContextType = {
  state: LoginState;
  dispatch: React.Dispatch<LoginAction> | undefined;
};

const LoginContext = React.createContext<LoginContextType>({
  state: new LoginInitState(),
  dispatch: undefined,
});

function reducer(state: LoginState, action: LoginAction) {
  if (action instanceof LoginStartedAction) {
    return new LoginLoadingState();
  }
  if (action instanceof LoginSucceedAction) {
    return new LoginSucceedState(action.user);
  }
  if (action instanceof LoginFailedAction) {
    return new LoginFailedState(action.errorMessage);
  }
  return new LoginInitState();
}

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, new LoginInitState());

  const { authRepo } = useInjection();

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}
