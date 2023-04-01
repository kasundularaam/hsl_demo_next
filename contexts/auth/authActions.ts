export default class AuthAction {}

export class AuthLogInAction extends AuthAction {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}

export class AuthSignInAction extends AuthAction {
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

export class AuthGetUserAction extends AuthAction {}
export class AuthSignOutAction extends AuthAction {}
export class AuthGetStatusAction extends AuthAction {}
