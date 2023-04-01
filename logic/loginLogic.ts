import LoginAction, {
  LoginFailedAction,
  LoginStartedAction,
} from "@/contexts/loginContext/LoginAction";

export default async function loginUser(
  email: string,
  password: string,
  dispatch: React.Dispatch<LoginAction>
): Promise<void> {
  try {
    dispatch(new LoginStartedAction(email, password));
    const;
  } catch (error) {
    dispatch(new LoginFailedAction(`${error}`));
  }
}
