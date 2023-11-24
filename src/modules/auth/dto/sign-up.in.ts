export interface ISignUpIn {
  user: IUser;
}

interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
