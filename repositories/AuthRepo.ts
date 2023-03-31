import IAuthRepo from "@/domain/auth/IAuthRepo";
import { User } from "@/domain/auth/User";
import AuthService from "@/services/AuthService";

export default class AuthRepo implements IAuthRepo {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  isSignedIn(): boolean {
    const isSignedIn = this.authService.isSignedIn();
    return isSignedIn;
  }
  getUid(): string {
    const uid = this.authService.getUid();
    return uid;
  }

  async loginUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.authService.loginUser(email, password);
      if (user) {
        return user;
      } else {
        throw Error("Couldn't login");
      }
    } catch (error) {
      throw error;
    }
  }

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const user = await this.authService.registerUser(name, email, password);
      if (user) {
        return user;
      } else {
        throw Error("Couldn't login");
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.authService.getUserByUid(id);
      if (user) {
        return user;
      } else {
        throw Error("Couldn't login");
      }
    } catch (error) {
      throw error;
    }
  }

  signOutUser(): void {
    this.authService.signOutUser();
  }
}
