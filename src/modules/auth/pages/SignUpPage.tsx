import React, { FC } from "react";
import Container from "../../../common/components/container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";
import { toast } from "react-toastify";
import { useAppActions } from "../../../hooks/appActions";
import { useAuth } from "../hooks/use-auth";
import { ErrorsList } from "../../../common/components/errors-list/ErrorsList";

interface SignUpPageProps {}

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}
const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
const SignUpPage: FC<SignUpPageProps> = () => {
  const { signUp } = useAuth();
  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signUp(values);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <Container>
      <h1 className="text-4xl text-center mb-4l">Sign up</h1>
      <p className="text-center mb-4">
        <Link to="/sign-in">Have an account?</Link>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >
        <ErrorsList errors={formState.errors} />
        <Input placeholder="Username" {...register("username")} />
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
            Sign up
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignUpPage;
