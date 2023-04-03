import ProfileCardAction, {
  ProfileCardFailedAction,
  ProfileCardLoadAction,
  ProfileCardLoadedAction,
} from "@/contexts/profileCardContext/ProfileCardAction";
import IAuthRepo from "@/domain/auth/IAuthRepo";

export default class ProfileCardLogic {
  private authRepo: IAuthRepo;
  private dispatch: React.Dispatch<ProfileCardAction>;
  constructor(
    authRepo: IAuthRepo,
    dispatch: React.Dispatch<ProfileCardAction>
  ) {
    this.authRepo = authRepo;
    this.dispatch = dispatch;
  }

  async loadProfileCard() {
    try {
      this.dispatch(new ProfileCardLoadAction());
      const uid = this.authRepo.getUid();
      const user = await this.authRepo.getUserById(uid);
      this.dispatch(new ProfileCardLoadedAction(user));
    } catch (error) {
      this.dispatch(new ProfileCardFailedAction(error));
    }
  }
}
