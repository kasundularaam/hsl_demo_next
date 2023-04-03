"use client";

import { useProfileCard } from "@/logic/profileCardLogic/ProfileCardContext";
import {
  ProfileCardFailedState,
  ProfileCardInitState,
  ProfileCardLoadedState,
  ProfileCardLoadingState,
} from "@/logic/profileCardLogic/ProfileCardState";
import React, { useEffect } from "react";

export default function ProfileCard() {
  const { state, profileCardLogic } = useProfileCard();

  useEffect(() => {
    profileCardLogic?.loadProfileCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {state instanceof ProfileCardLoadingState && <div>Loading...</div>}
      {state instanceof ProfileCardLoadedState && <div>{state.user.name}</div>}
      {state instanceof ProfileCardFailedState && (
        <div>{state.errorMessage}</div>
      )}
      {state instanceof ProfileCardInitState && <div>Placeholder</div>}
    </>
  );
}
