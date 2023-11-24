export interface ISignUpOut {
  user: IUser;
}

interface IUser {
  username: string;
  email: string;
  password: string;
}
