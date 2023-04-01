import { User } from "@/domain/auth/User";

export default abstract class LoginState {}

export class LoginInitState extends LoginState {}
export class LoginLoadingState extends LoginState {}
export class LoginSucceedState extends LoginState {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}
export class LoginFailedState extends LoginState {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
