import { User } from "@/domain/auth/User";

export default abstract class RegisterState {}

export class RegisterInitState extends RegisterState {}
export class RegisterLoadingState extends RegisterState {}
export class RegisterSucceedState extends RegisterState {
  user: User;
  token: string;
  constructor(user: User, token: string) {
    super();
    this.user = user;
    this.token = token;
  }
}
export class RegisterFailedState extends RegisterState {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
