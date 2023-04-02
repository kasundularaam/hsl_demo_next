import AuthStatusAction, {
  AuthStatusAuthorizeAction,
  AuthStatusUnauthorizeAction,
} from "@/contexts/authStatus/AuthStatusAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default class AuthStatusLogic {
  authRepo: IAuthRepo;
  dispatch: React.Dispatch<AuthStatusAction>;

  constructor(authRepo: IAuthRepo, dispatch: React.Dispatch<AuthStatusAction>) {
    this.authRepo = authRepo;
    this.dispatch = dispatch;
  }

  saveNewUser(token: string, uid: string): void {
    this.authRepo.saveUser(token, uid);
    this.dispatch(new AuthStatusAuthorizeAction());
  }

  removeExistingUser(): void {
    this.authRepo.removeUser();
    this.dispatch(new AuthStatusUnauthorizeAction());
  }
}
