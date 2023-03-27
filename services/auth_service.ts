import axios, { AxiosError } from "axios";
import User from "@/models/user";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { LoginData, RegisterData } from "@/models/form_data";

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
    saveAuthToken(token);
    saveUid(user._id);
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
    const { token } = res.data;

    const user = extractUser(res);
    saveAuthToken(token);
    saveUid(user._id);
    return user;
  } catch (error) {
    handleError(error);
  }
};

const signOutUser = () => {
  destroyCookie(null, "auth-token");
};

const isSignIn = () => {
  const token = getAuthToken();
  if (token) {
    return true;
  }
  return false;
};

const getUserByUid = async (uid: string) => {
  try {
    const res = await axios.get(url);
    const user = extractUser(res);
    return user;
  } catch (error) {
    handleError(error);
  }
};

const getAuthToken = () => {
  const token = parseCookies().authToken;
  return token;
};
const getUid = () => {
  const token = parseCookies().uid;
  return token;
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

const extractUser = (res: any) => {
  const user: User = res.data.user;
  return user;
};

const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    const { msg } = error.response?.data;
    throw msg;
  } else {
    throw `ERROR: ${error}`;
  }
};
