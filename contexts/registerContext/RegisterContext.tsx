"use client";

import { useInjection } from "@/injection/Injection";
import createRegisterLogic from "@/logic/registerLogic";
import React, { useContext, useReducer } from "react";
import RegisterAction, {
  RegisterFailedAction,
  RegisterStartedAction,
  RegisterSucceedAction,
} from "./RegisterAction";
import RegisterState, {
  RegisterFailedState,
  RegisterInitState,
  RegisterLoadingState,
  RegisterSucceedState,
} from "./RegisterState";

type RegisterContextType = {
  state: RegisterState;
  registerUser:
    | ((name: string, email: string, password: string) => Promise<void>)
    | undefined;
};

const RegisterContext = React.createContext<RegisterContextType>({
  state: new RegisterInitState(),
  registerUser: undefined,
});

function reducer(state: RegisterState, action: RegisterAction) {
  if (action instanceof RegisterStartedAction) {
    return new RegisterLoadingState();
  }
  if (action instanceof RegisterSucceedAction) {
    return new RegisterSucceedState(action.user);
  }
  if (action instanceof RegisterFailedAction) {
    return new RegisterFailedState(action.errorMessage);
  }
  return new RegisterInitState();
}

export function useRegister() {
  return useContext(RegisterContext);
}

export default function RegisterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, new RegisterInitState());

  const { authRepo } = useInjection();

  const registerUser = createRegisterLogic(authRepo, dispatch);

  return (
    <RegisterContext.Provider value={{ state, registerUser }}>
      {children}
    </RegisterContext.Provider>
  );
}
