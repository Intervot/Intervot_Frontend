import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services/auth/authServices";
import axios from "axios";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailValues = watch("email");
  const passwordValues = watch("password");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
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
        if (status === 401) {
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
  const onSubmit = (data: LoginForm) => {
    console.log(data);

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
    <div className="w-full m-auto flex flex-col items-center justify-start">
      <div className="w-full mb-9 mt-10">
        <p className="text-3xl font-bold mb-2">안녕하세요</p>
        <p className="text-3xl font-bold mb-4"> 인터봇입니다.</p>
        <span className="font-semi-bold text-gray-600">
          연습하고 분석하고 성장하는 AI 면접 플랫폼
        </span>
      </div>
      <div className="w-full bg-white">
        <p className="font-bold text-xl mb-4">로그인</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* 이메일 입력 */}
          <div className="relative">
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일을 입력해주세요.",
                },
              })}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              disabled={isPending}
              className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                errors.email
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-gray-500/30 focus:border-gray-200"
              } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label
              htmlFor="email"
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                isEmailFocused || emailValues
                  ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                  : "top-5 text-sm text-gray-400"
              }`}
            >
              이메일
            </label>
            {errors.email && (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.email.message}
              </p>
            )}
            {!errors.email && <div className="min-h-[20px]" />}
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative">
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
              })}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              disabled={isPending}
              className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                errors.password
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-gray-500/30 focus:border-gray-200"
              } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label
              htmlFor="password"
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                isPasswordFocused || passwordValues
                  ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                  : "top-5 text-sm text-gray-400"
              }`}
            >
              비밀번호
            </label>
            {errors.password && (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.password.message}
              </p>
            )}
            {!errors.password && <div className="min-h-[20px]" />}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 h-[60px] rounded-md border border-blue-900 text-sm font-medium transition-colors mb-3
              ${
                !isValid || isSubmitting || isPending
                  ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 cursor-pointer"
              }`}
          >
            로그인
          </button>

          {/* 회원가입 링크 */}
          <div className="text-center mt-5">
            <p className="text-black">
              계정이 없으신가요?&nbsp;
              <Link
                to="/signup"
                className="text-blue-900 border-b-1 border-black pb-[1px] visited:text-black"
              >
                <span className="font-bold">회원가입</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
