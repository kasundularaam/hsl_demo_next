import { User } from "@/domain/auth/User";
import asyncWrapper from "@/utils/asyncWrapper";
import {
  destroySavedUser,
  getSavedAuthToken,
  getSavedUid,
  saveTokenAndIdUid,
} from "@/utils/authCookiesHelper";
import axios from "axios";

const url = "http://localhost:8000/api/v1/users";

export default class AuthService {
  isSignedIn = () => {
    const token = getSavedAuthToken();
    const uid = getSavedUid();
    if (token && uid) {
      return true;
    }
    return false;
  };

  getUid = () => {
    const uid = getSavedUid();
    return uid;
  };

  loginUser = asyncWrapper(
    async (
      email: string,
      password: string
    ): Promise<{ user: User; token: string }> => {
      const res = await axios.post(`${url}/login`, {
        email: email,
        password: password,
      });
      const { user, token } = res.data;
      return { user, token };
    }
  );

  registerUser = asyncWrapper(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ user: User; token: string }> => {
      const res = await axios.post(`${url}/register`, {
        name: name,
        email: email,
        password: password,
      });

      const { user, token } = res.data;
      return { user, token };
    }
  );

  getUserByUid = asyncWrapper(async (uid: string): Promise<User> => {
    const res = await axios.get(`${url}/${uid}`);
    const user = res.data;
    return user;
  });

  removeUser = () => {
    destroySavedUser();
  };

  saveUser = (token: string, uid: string) => {
    saveTokenAndIdUid(token, uid);
  };
}
