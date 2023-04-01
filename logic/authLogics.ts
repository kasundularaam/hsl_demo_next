import IAuthRepo from "@/domain/auth/IAuthRepo";
import { User } from "@/domain/auth/User";
import { useEffect, useState } from "react";

export type AuthLogics = {
  useLogin: (
    email: string,
    password: string
  ) => {
    isLoading: Boolean | undefined;
    data: User | undefined;
    error: Error | undefined;
  };

  useRegister: (
    name: string,
    email: string,
    password: string
  ) => {
    isLoading: Boolean | undefined;
    data: User | undefined;
    error: Error | undefined;
  };
  useGetUser: (id: string) => {
    isLoading: Boolean | undefined;
    data: User | undefined;
    error: Error | undefined;
  };

  useSignOut: () => () => void;

  useIsSignedIn: () => Boolean;
  useGetUid: () => string | undefined;
};

export default function createAuthLogics(authRepo: IAuthRepo): AuthLogics {
  function useLogin(email: string, password: string) {
    const [data, setData] = useState<User>();
    const [isLoading, setIsLoading] = useState<Boolean>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
      setIsLoading(true);
      authRepo
        .loginUser(email, password)
        .then((user) => setData(user))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }, [email, password]);

    return { isLoading, data, error };
  }

  function useRegister(name: string, email: string, password: string) {
    const [data, setData] = useState<User>();
    const [isLoading, setIsLoading] = useState<Boolean>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
      setIsLoading(true);
      authRepo
        .registerUser(name, email, password)
        .then((user) => setData(user))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }, [name, email, password]);

    return { isLoading, data, error };
  }

  function useGetUser(id: string) {
    const [data, setData] = useState<User>();
    const [isLoading, setIsLoading] = useState<Boolean>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
      setIsLoading(true);
      authRepo
        .getUserById(id)
        .then((user) => setData(user))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }, [id]);

    return { isLoading, data, error };
  }

  function useSignOut(): () => void {
    function signOutUser() {
      authRepo.signOutUser();
    }
    return signOutUser;
  }

  function useIsSignedIn() {
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

    useEffect(() => {
      const res = authRepo.isSignedIn();
      setIsSignedIn(res);
    }, []);

    return isSignedIn;
  }

  function useGetUid() {
    const [uid, setUid] = useState<string>();

    useEffect(() => {
      const res = authRepo.getUid();
      setUid(res);
    }, []);

    return uid;
  }

  return {
    useLogin,
    useRegister,
    useGetUser,
    useSignOut,
    useIsSignedIn,
    useGetUid,
  };
}
