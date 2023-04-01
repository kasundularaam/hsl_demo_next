"use client";

import IAuthRepo from "@/domain/auth/IAuthRepo";
import AuthRepo from "@/repositories/AuthRepo";
import AuthService from "@/services/AuthService";
import React, { useContext, useEffect, useState } from "react";

export enum ENVIRONMENT {
  DEV = "development",
  PROD = "production",
  TEST = "testing",
}

const env = ENVIRONMENT.DEV;

const InjectionContext = React.createContext<any>({});

export function useInjection() {
  return useContext(InjectionContext);
}

type Dependencies = {
  authRepo: IAuthRepo;
};

function getDevDependencies(): Dependencies {
  const authRepo = new AuthRepo(new AuthService());
  return { authRepo: authRepo };
}

function mapDependencies(
  env: ENVIRONMENT,
  setDependencies: React.Dispatch<React.SetStateAction<Dependencies>>
) {
  if (env === ENVIRONMENT.DEV) {
    const devDependencies = getDevDependencies();
    setDependencies(devDependencies);
  }
}

export default function InjectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dependencies, setDependencies] = useState<Dependencies>(
    getDevDependencies()
  );
  useEffect(() => {
    mapDependencies(env, setDependencies);
  }, []);
  return (
    <InjectionContext.Provider value={dependencies}>
      {children}
    </InjectionContext.Provider>
  );
}
