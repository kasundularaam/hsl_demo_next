export default abstract class AuthStatusState {}

export class AuthStatusAuthorizedState extends AuthStatusState {}
export class AuthStatusUnauthorizedState extends AuthStatusState {}
export class AuthStatusUnknownState extends AuthStatusState {}
