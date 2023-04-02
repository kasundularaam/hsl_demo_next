import { User } from "@/domain/auth/User";

export default abstract class LoginState {}

export class LoginInitState extends LoginState {}
export class LoginLoadingState extends LoginState {}
export class LoginSucceedState extends LoginState {
  user: User;
  token: string;
  constructor(user: User, token: string) {
    super();
    this.user = user;
    this.token = token;
  }
}
export class LoginFailedState extends LoginState {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
