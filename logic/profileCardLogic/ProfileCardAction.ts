import { User } from "@/domain/auth/User";

export default abstract class ProfileCardAction {}

export class ProfileCardLoadAction extends ProfileCardAction {}
export class ProfileCardLoadingAction extends ProfileCardAction {}
export class ProfileCardLoadedAction extends ProfileCardAction {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}
export class ProfileCardFailedAction extends ProfileCardAction {
  errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
  }
}
