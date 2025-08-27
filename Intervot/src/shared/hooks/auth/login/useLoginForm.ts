import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    trigger,
  };
};
