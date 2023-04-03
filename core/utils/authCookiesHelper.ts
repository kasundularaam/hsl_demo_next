import { destroyCookie, parseCookies, setCookie } from "nookies";

const AUTH_TOKEN_KEY = "authToken";
const UID_KEY = "uid";

export const getSavedAuthToken = () => {
  const token = parseCookies().authToken;
  return token;
};

export const getSavedUid = () => {
  const token = parseCookies().uid;
  return token;
};

export const saveTokenAndIdUid = (token: string, uid: string) => {
  console.log("UID = ", uid, "TOKEN = ", token);

  saveAuthToken(token);
  saveUid(uid);
};

export const saveAuthToken = (token: string) => {
  setCookie(null, AUTH_TOKEN_KEY, token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const saveUid = (uid: string) => {
  setCookie(null, UID_KEY, uid, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const destroySavedUser = () => {
  destroyCookie(null, AUTH_TOKEN_KEY);
  destroyCookie(null, UID_KEY);
};
