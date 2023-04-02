import { User } from "./User";

export default interface IAuthRepo {
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
  isSignedIn: () => boolean;
  getUid: () => string;
  getUserById: (id: string) => Promise<User>;
  saveUser: (token: string, uid: string) => void;
  removeUser: () => void;
}
