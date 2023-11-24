import { createApi } from "@reduxjs/toolkit/query/react";
import { realWorldBaseQuery } from "../../../core/api/realworld-base-query";
import { ISignUpOut } from "../dto/sign-up.out";
import { ISignUpIn } from "../dto/sign-up.in";
import { ISignInIn } from "../dto/sign-in.in";

interface SignUpParams {
  username: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.query<ISignUpIn, SignUpParams>({
      query: (args) => {
        const data: ISignUpOut = {
          user: args,
        };

        return {
          url: "/users",
          method: "post",
          data,
        };
      },
    }),
    signIn: builder.query<ISignInIn, SignInParams>({
      query: (args) => ({
        url: "users/login",
        method: "post",
        data: {
          user: args,
        },
      }),
    }),
  }),
});
export const { useLazySignInQuery, useLazySignUpQuery } = authApi;
