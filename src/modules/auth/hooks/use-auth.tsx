import { useSelector } from "react-redux";
import { selectUser } from "../service/auth.slice";
import { ISignInOut } from "../dto/sign-in.out";
import { useAppActions } from "../../../hooks/appActions";
import { ISignUpOut } from "../dto/sign-up.out";
import { useLazySignInQuery, useLazySignUpQuery } from "../api/authApi";

export const useAuth = () => {
  const { setUser } = useAppActions();

  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [signInFn] = useLazySignInQuery();
  const [signUpFn] = useLazySignUpQuery();

  const signIn = async (values: ISignInOut["user"]) => {
    const { data } = await signInFn(values);
    if (!data) {
      throw new Error();
    }
    setUser(data.user);
  };

  const signUp = async (values: ISignUpOut["user"]) => {
    const { data } = await signUpFn(values);
    if (!data) {
      throw new Error();
    }
    setUser(data.user);
  };

  const logOut = () => {
    setUser(null);
  };
  return { isLoggedIn, signIn, signUp, logOut, user };
};
