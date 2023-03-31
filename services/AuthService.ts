import { User } from "@/domain/auth/User";
import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const url = "http://localhost:8000/api/v1/users";

export default class AuthService {
  loginUser = async (email: string, password: string) => {
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
  registerUser = async (name: string, email: string, password: string) => {
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

  signOutUser = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "uid");
  };

  isSignedIn = () => {
    const token = getAuthToken();
    if (token) {
      return true;
    }
    return false;
  };

  getUid = () => {
    const token = parseCookies().uid;
    return token;
  };

  getUserByUid = async (uid: string) => {
    try {
      const res = await axios.get(`${url}/${uid}`);
      const user = res.data;
      return user;
    } catch (error) {
      handleError(error);
    }
  };
}

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
