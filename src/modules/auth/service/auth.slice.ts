import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignUpIn } from "../dto/sign-up.in";
import { RootState } from "../../../store/store";

interface AuthState {
  user: ISignUpIn["user"] | null;
}

const initialState: AuthState = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISignUpIn["user"] | null>) => {
      if (action.payload === null) {
        state.user = null;
        return;
      }
      state.user = {
        ...action.payload,
      };
    },
  },
});
export const selectUser = (state: RootState) => {
  return state.auth.user;
};
export const authActions = authSlice.actions;
