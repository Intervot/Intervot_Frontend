import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { authService } from "@/shared/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormData, SignupRequest } from "@/shared/types/auth/signup";
import SignupForm from "@/web/components/auth/signup/SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      alert("회원가입이 완료되었습니다! 로그인 해주세요.");
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          const errorMessage =
            error.response?.data?.message || "입력값이 올바르지 않습니다.";
          alert(errorMessage);
        } else if (status === 500) {
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    },
  });

  const onSubmit = (data: SignupFormData) => {
    const signupData: SignupRequest = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    };
    mutate(signupData);
  };

  if (isPending) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="회원가입 중입니다...."
      />
    );
  }

  return (
    <div className="w-[80%] mx-auto in-h-screen flex flex-col items-center justify-start mb-30">
      <div className="mx-auto w-[50%] text-3xl font-bold mb-10 mt-15">
        <h1>환영합니다!</h1>
        <h1>당신의 취업을 응원합니다.</h1>
      </div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
        <SignupForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          watch={watch}
          isValid={isValid}
          isPending={isPending}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default SignupPage;
