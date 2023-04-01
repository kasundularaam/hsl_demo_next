"use client";

import { useInjection } from "@/injection/Injection";
import createLoginLogic from "@/logic/loginLogic";
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
  loginUser: ((email: string, password: string) => Promise<void>) | undefined;
};

const LoginContext = React.createContext<LoginContextType>({
  state: new LoginInitState(),
  loginUser: undefined,
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

  const loginUser = createLoginLogic(authRepo, dispatch);

  return (
    <LoginContext.Provider value={{ state, loginUser }}>
      {children}
    </LoginContext.Provider>
  );
}
