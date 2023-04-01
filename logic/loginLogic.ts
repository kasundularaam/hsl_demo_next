import LoginAction, {
  LoginFailedAction,
  LoginStartedAction,
  LoginSucceedAction,
} from "@/contexts/loginContext/LoginAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default function createLoginLogic(
  authRepo: IAuthRepo,
  dispatch: React.Dispatch<LoginAction>
) {
  return async function loginUser(
    email: string,
    password: string
  ): Promise<void> {
    try {
      dispatch(new LoginStartedAction(email, password));
      const user = await authRepo.loginUser(email, password);
      dispatch(new LoginSucceedAction(user));
    } catch (error) {
      dispatch(new LoginFailedAction(`${error}`));
    }
  };
}
