import AuthStatusAction from "@/contexts/authStatus/AuthStatusAction";
import AuthStatusState from "@/contexts/authStatus/AuthStatusState";

export default function createAuthStatusLogic(
  dispatch: React.Dispatch<AuthStatusAction>
) {
  return function updateAuthStatus(status: AuthStatusState): void {
    dispatch(status);
  };
}
