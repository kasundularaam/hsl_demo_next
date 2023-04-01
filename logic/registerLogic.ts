import RegisterAction, {
  RegisterFailedAction,
  RegisterStartedAction,
  RegisterSucceedAction,
} from "@/contexts/registerContext/RegisterAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default function createRegisterLogic(
  authRepo: IAuthRepo,
  dispatch: React.Dispatch<RegisterAction>
) {
  return async function registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      dispatch(new RegisterStartedAction(name, email, password));
      const user = await authRepo.registerUser(name, email, password);
      dispatch(new RegisterSucceedAction(user));
    } catch (error) {
      dispatch(new RegisterFailedAction(`${error}`));
    }
  };
}
