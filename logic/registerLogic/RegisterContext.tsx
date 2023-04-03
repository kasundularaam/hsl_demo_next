"use client";

import { useInjection } from "@/injection/Injection";
import RegisterLogic from "./registerLogic";
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
  registerLogic: RegisterLogic | undefined;
};

const RegisterContext = React.createContext<RegisterContextType>({
  state: new RegisterInitState(),
  registerLogic: undefined,
});

function reducer(state: RegisterState, action: RegisterAction) {
  if (action instanceof RegisterStartedAction) {
    return new RegisterLoadingState();
  }
  if (action instanceof RegisterSucceedAction) {
    return new RegisterSucceedState(action.user, action.token);
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

  const registerLogic = new RegisterLogic(authRepo, dispatch);

  return (
    <RegisterContext.Provider value={{ state, registerLogic }}>
      {children}
    </RegisterContext.Provider>
  );
}
