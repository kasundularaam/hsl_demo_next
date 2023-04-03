import { useInjection } from "@/injection/Injection";
import ProfileCardLogic from "@/logic/ProfileCardLogic";
import React, { useContext, useReducer } from "react";
import {
  ProfileCardFailedAction,
  ProfileCardLoadAction,
  ProfileCardLoadedAction,
} from "./ProfileCardAction";
import ProfileCardState, {
  ProfileCardFailedState,
  ProfileCardInitState,
  ProfileCardLoadedState,
  ProfileCardLoadingState,
} from "./ProfileCardState";

type ProfileCardContextType = {
  state: ProfileCardState;
  profileCardLogic: ProfileCardLogic | undefined;
};

const ProfileCardContext = React.createContext<ProfileCardContextType>({
  state: new ProfileCardInitState(),
  profileCardLogic: undefined,
});

function reducer(state: ProfileCardState, action: ProfileCardState) {
  if (action instanceof ProfileCardLoadAction) {
    return new ProfileCardLoadingState();
  }
  if (action instanceof ProfileCardLoadedAction) {
    return new ProfileCardLoadedState(action.user);
  }
  if (action instanceof ProfileCardFailedAction) {
    return new ProfileCardFailedState(action.errorMessage);
  }
  return new ProfileCardInitState();
}

export function useProfileCard() {
  return useContext(ProfileCardContext);
}

export default function ProfileCardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, new ProfileCardInitState());
  const { authRepo } = useInjection();
  const profileCardLogic = new ProfileCardLogic(authRepo, dispatch);
  return (
    <ProfileCardContext.Provider value={{ state, profileCardLogic }}>
      {children}
    </ProfileCardContext.Provider>
  );
}
