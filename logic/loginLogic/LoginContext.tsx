"use client";

import { useInjection } from "@/injection/Injection";
import LoginLogic from "./loginLogic";
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
  loginLogic: LoginLogic | undefined;
};

const LoginContext = React.createContext<LoginContextType>({
  state: new LoginInitState(),
  loginLogic: undefined,
});

function reducer(state: LoginState, action: LoginAction) {
  if (action instanceof LoginStartedAction) {
    return new LoginLoadingState();
  }
  if (action instanceof LoginSucceedAction) {
    return new LoginSucceedState(action.user, action.token);
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

  const loginLogic = new LoginLogic(authRepo, dispatch);

  return (
    <LoginContext.Provider value={{ state, loginLogic }}>
      {children}
    </LoginContext.Provider>
  );
}
