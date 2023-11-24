import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../modules/auth/service/auth.slice";
import { feedActions } from "../modules/feed/service/feed.slice";

const actions = {
  ...feedActions,
  ...authActions,
};
export const useAppActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
