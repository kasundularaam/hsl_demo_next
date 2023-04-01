import { User } from "@/domain/auth/User";

export default abstract class RegisterAction {}

export class RegisterStartedAction extends RegisterAction {
  name: string;
  email: string;
  password: string;
  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class RegisterLoadingAction extends RegisterAction {}

export class RegisterSucceedAction extends RegisterAction {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}

export class RegisterFailedAction extends RegisterAction {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
