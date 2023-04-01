import { User } from "@/domain/auth/User";

export default abstract class RegisterState {}

export class RegisterInitState extends RegisterState {}
export class RegisterLoadingState extends RegisterState {}
export class RegisterSucceedState extends RegisterState {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}
export class RegisterFailedState extends RegisterState {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
