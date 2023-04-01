import { User } from "@/domain/auth/User";

export default abstract class AuthState {}

export class AuthInitialState extends AuthState {}

export class AuthLoadingState extends AuthState {}

export class AuthSucceedState extends AuthState {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}

export class AuthErrorState extends AuthState {}

export class AuthAuthenticatedState extends AuthState {}

export class AuthNotAuthenticatedState extends AuthState {}
