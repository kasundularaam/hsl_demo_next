import AuthStatusAction, {
  AuthStatusAuthorizeAction,
  AuthStatusUnauthorizeAction,
} from "./AuthStatusAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default class AuthStatusLogic {
  private authRepo: IAuthRepo;
  private dispatch: React.Dispatch<AuthStatusAction>;

  constructor(authRepo: IAuthRepo, dispatch: React.Dispatch<AuthStatusAction>) {
    this.authRepo = authRepo;
    this.dispatch = dispatch;
  }

  loadAuthStatus() {
    const isSignedIn = this.authRepo.isSignedIn();
    if (isSignedIn) {
      this.dispatch(new AuthStatusAuthorizeAction());
    } else {
      this.dispatch(new AuthStatusUnauthorizeAction());
    }
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
