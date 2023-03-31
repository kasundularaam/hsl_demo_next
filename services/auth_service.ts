import axios, { AxiosError, AxiosResponse } from "axios";
import User from "@/models/user";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { LoginData, RegisterData } from "@/models/form_data";
import { log } from "console";

const url = "http://localhost:8000/api/v1/users";

export const loginUser = async (loginData: LoginData) => {
  const { email, password } = loginData;

  try {
    const res = await axios.post(`${url}/login`, {
      email: email,
      password: password,
    });
    const { token } = res.data;
    const user = extractUser(res);
    saveUser(token, user._id);
    return user;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (registerData: RegisterData) => {
  const { name, email, password } = registerData;

  try {
    const res = await axios.post(`${url}/register`, {
      name: name,
      email: email,
      password: password,
    });

    if (res.status != 201) {
      handleError(res.data);
    }

    const { token } = res.data;
    const user = extractUser(res);
    saveUser(token, user._id);
    return user;
  } catch (error) {
    handleError(error);
  }
};

export const signOutUser = () => {
  destroyCookie(null, "authToken");
  destroyCookie(null, "uid");
};

export const isSignedIn = () => {
  const token = getAuthToken();
  if (token) {
    return true;
  }
  return false;
};

export const getUserByUid = async (uid: string) => {
  try {
    const res = await axios.get(`${url}/${uid}`);
    const user = res.data;
    return user;
  } catch (error) {
    handleError(error);
  }
};
export const getUid = () => {
  const token = parseCookies().uid;
  return token;
};

const getAuthToken = () => {
  const token = parseCookies().authToken;
  return token;
};

const saveUser = (token: string, uid: string) => {
  saveAuthToken(token);
  saveUid(uid);
};

const saveAuthToken = (token: string) => {
  setCookie(null, "authToken", token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

const saveUid = (uid: string) => {
  setCookie(null, "uid", uid, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

const extractUser = (res: AxiosResponse) => {
  const user: User = res.data.user;
  return user;
};

const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    const msg = error.message;
    throw `ERROR: ${msg}`;
  } else {
    throw `ERROR: ${error}`;
  }
};
