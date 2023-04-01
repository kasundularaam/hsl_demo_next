import IAuthRepo from "@/domain/auth/IAuthRepo";
import AuthRepo from "@/repositories/AuthRepo";
import AuthService from "@/services/AuthService";
import React, { useContext, useEffect, useState } from "react";
const InjectionContext = React.createContext<any>({});

export function useInjection() {
  return useContext(InjectionContext);
}

enum ENVIRONMENT {
  DEV = "development",
  PROD = "production",
  TEST = "testing",
}

type Dependencies = {
  authRepo: IAuthRepo;
};

function getDevDependencies(): Dependencies {
  const authService = new AuthService();
  const authRepo = new AuthRepo(authService);
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

export default function Injection({ children }: { children: React.ReactNode }) {
  const [dependencies, setDependencies] = useState<Dependencies>(
    getDevDependencies()
  );
  useEffect(() => {
    mapDependencies(ENVIRONMENT.DEV, setDependencies);
  }, []);
  return (
    <InjectionContext.Provider value={dependencies}>
      {children}
    </InjectionContext.Provider>
  );
}
