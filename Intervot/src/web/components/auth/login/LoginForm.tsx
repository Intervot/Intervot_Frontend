import { useLoginForm } from "../../../../shared/hooks/auth/login/useLoginForm";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import LoginButton from "./components/LoginButton";
import SignupLink from "./components/SignupLink";

type LoginForm = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginForm) => void;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const { register, handleSubmit, errors, isValid, trigger } = useLoginForm();

  const handleFormSubmit = (data: LoginForm) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
      <EmailInput
        register={register}
        error={errors.email}
        trigger={() => trigger("email")}
      />
      <PasswordInput
        register={register}
        error={errors.password}
        trigger={() => trigger("password")}
      />
      <LoginButton isValid={isValid} isLoading={isLoading} />
      <SignupLink />
    </form>
  );
};

export default LoginForm;
