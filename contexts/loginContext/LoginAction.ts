import { User } from "@/domain/auth/User";

export default abstract class LoginAction {}

export class LoginStartedAction extends LoginAction {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}

export class LoginLoadingAction extends LoginAction {}

export class LoginSucceedAction extends LoginAction {
  user: User;
  token: string;
  constructor(user: User, token: string) {
    super();
    this.user = user;
    this.token = token;
  }
}

export class LoginFailedAction extends LoginAction {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
