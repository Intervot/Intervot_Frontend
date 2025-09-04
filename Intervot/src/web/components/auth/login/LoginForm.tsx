import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { LoginFormData } from "@/shared/types/auth/login";
import LoginEmailInput from "./LoginEmailInput";
import LoginPasswordInput from "./LoginPasswordInput";
import LoginButton from "./LoginButton";
import LoginSignupLink from "./LoginSignupLink";

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isValid: boolean;
  isPending: boolean;
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({
  handleSubmit,
  register,
  errors,
  isValid,
  isPending,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <LoginEmailInput register={register} error={errors.email} />
      <LoginPasswordInput register={register} error={errors.password} />
      <LoginButton isValid={isValid} isPending={isPending} />
      <LoginSignupLink />
    </form>
  );
};

export default LoginForm;
