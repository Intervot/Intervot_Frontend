import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services/auth/authServices";
import axios from "axios";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { LoginFormData } from "@/shared/types/auth/login";
import LoginForm from "@/web/components/auth/login/LoginForm";

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      console.log(response);

      const userInfo = {
        nickname: response?.nickname,
      };

      const tokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        accessTokenExpiresAt: response.accessTokenExpiresAt,
      };

      login(userInfo, tokens);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        console.log("Login error status:", status);
        if (status === 400) {
          alert("일치하는 정보가 없습니다.");
        } else if (status === 500) {
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        } else if (status === 404) {
          alert("요청한 API를 찾을 수 없습니다.");
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  if (isPending) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="로그인중입니다...."
      />
    );
  }

  return (
    <div className="min-h-screen w-[80%] m-auto flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-9 mt-25">로그인</h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
        <LoginForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isValid={isValid}
          isSubmitting={isSubmitting}
          isPending={isPending}
          trigger={trigger}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default LoginPage;
