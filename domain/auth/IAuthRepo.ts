import { User } from "./User";

export default interface IAuthRepo {
  loginUser: (email: string, password: string) => Promise<User>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<User>;
  isSignedIn: () => boolean;
  getUid: () => string;
  getUserById: (id: string) => Promise<User>;
  signOutUser: () => void;
}
