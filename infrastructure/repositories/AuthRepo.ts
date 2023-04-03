import IAuthRepo from "@/domain/auth/IAuthRepo";
import { User } from "@/domain/auth/User";
import AuthService from "@/infrastructure/services/AuthService";

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

  saveUser(token: string, uid: string) {
    this.authService.saveUser(token, uid);
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const data = await this.authService.loginUser(email, password);
    return data;
  }

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const data = await this.authService.registerUser(name, email, password);
    return data;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.authService.getUserByUid(id);
    return user;
  }

  removeUser(): void {
    this.authService.removeUser();
  }
}
