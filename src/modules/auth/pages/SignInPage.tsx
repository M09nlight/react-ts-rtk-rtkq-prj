import React, { FC } from "react";
import Container from "../../../common/components/container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/use-auth";
import { ErrorsList } from "../../../common/components/errors-list/ErrorsList";

interface SignInPageProps {}

interface SignInFormValues {
  email: string;
  password: string;
}
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
const SignInPage: FC<SignInPageProps> = () => {
  const { signIn, logOut } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <Container>
      <h1 className="text-4xl text-center mb-4l">Sign in</h1>
      <p className="text-center mb-4">
        <Link to="/sign-up">Need an account?</Link>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >
        <ErrorsList errors={formState.errors} />
        <Input placeholder="Email" type="email" {...register("email")} />
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <div className="flex justify-end">
          <Button
            btnStyle="GREEN"
            size="LG"
            disabled={formState.isSubmitting}
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignInPage;
