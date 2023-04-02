import LoginAction, {
  LoginFailedAction,
  LoginStartedAction,
  LoginSucceedAction,
} from "@/contexts/loginContext/LoginAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default class LoginLogic {
  authRepo: IAuthRepo;
  dispatch: React.Dispatch<LoginAction>;

  constructor(authRepo: IAuthRepo, dispatch: React.Dispatch<LoginAction>) {
    this.authRepo = authRepo;
    this.dispatch = dispatch;
  }

  async loginUser(email: string, password: string): Promise<void> {
    try {
      this.dispatch(new LoginStartedAction(email, password));
      const { user, token } = await this.authRepo.loginUser(email, password);
      this.dispatch(new LoginSucceedAction(user, token));
    } catch (error) {
      this.dispatch(new LoginFailedAction(`${error}`));
    }
  }
}
