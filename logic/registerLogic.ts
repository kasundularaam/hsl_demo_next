import RegisterAction, {
  RegisterFailedAction,
  RegisterStartedAction,
  RegisterSucceedAction,
} from "@/contexts/registerContext/RegisterAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default class RegisterLogic {
  private authRepo: IAuthRepo;
  private dispatch: React.Dispatch<RegisterAction>;

  constructor(authRepo: IAuthRepo, dispatch: React.Dispatch<RegisterAction>) {
    this.authRepo = authRepo;
    this.dispatch = dispatch;
  }

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      this.dispatch(new RegisterStartedAction(name, email, password));
      const { user, token } = await this.authRepo.registerUser(
        name,
        email,
        password
      );
      this.dispatch(new RegisterSucceedAction(user, token));
    } catch (error) {
      this.dispatch(new RegisterFailedAction(`${error}`));
    }
  }
}
