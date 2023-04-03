import { User } from "@/domain/auth/User";

export default abstract class ProfileCardState {}

export class ProfileCardInitState extends ProfileCardState {}
export class ProfileCardLoadingState extends ProfileCardState {}
export class ProfileCardLoadedState extends ProfileCardState {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}
export class ProfileCardFailedState extends ProfileCardState {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
