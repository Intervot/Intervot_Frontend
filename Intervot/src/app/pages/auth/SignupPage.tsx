import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { authService } from "@/shared/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type SignupForm = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

type SignupRequest = {
  email: string;
  nickname: string;
  password: string;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailValues = watch("email");
  const nicknameValues = watch("nickname");
  const passwordValues = watch("password");
  const confirmPasswordValues = watch("confirmPassword");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

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

  const onSubmit = (data: SignupForm) => {
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
    <div className="w-full m-auto flex flex-col items-center justify-start">
      <div className="w-full mb-9 mt-10">
        <p className="text-2xl font-bold mb-2">환영합니다!</p>
        <p className="text-2xl font-bold mb-3">
          인터봇이 당신의 취업을 진심으로응원합니다.
        </p>
      </div>
      <div className="w-full bg-white ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* 이메일 */}
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

          {/* 닉네임 */}
          <div className="relative">
            <input
              id="nickname"
              type="text"
              {...register("nickname", {
                required: "닉네임은 필수 입력값입니다.",
                maxLength: {
                  value: 6,
                  message: "닉네임은 6글자 이하로 입력해주세요.",
                },
              })}
              onFocus={() => setIsNicknameFocused(true)}
              onBlur={() => setIsNicknameFocused(false)}
              disabled={isPending}
              className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                errors.nickname
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-gray-500/30 focus:border-gray-200"
              } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label
              htmlFor="nickname"
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                isNicknameFocused || nicknameValues
                  ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                  : "top-5 text-sm text-gray-400"
              }`}
            >
              닉네임
            </label>
            {errors.nickname && (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.nickname.message}
              </p>
            )}
            {!errors.nickname && <div className="min-h-[20px]" />}
          </div>

          {/* 비밀번호 */}
          <div className="relative">
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/,
                  message:
                    "비밀번호는 영문, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.",
                },
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

          {/* 비밀번호 확인 */}
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수 입력값입니다.",
                validate: (value) =>
                  value === passwordValues || "비밀번호가 일치하지 않습니다.",
              })}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              disabled={isPending}
              className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                errors.confirmPassword
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-gray-500/30 focus:border-gray-200"
              } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                isConfirmPasswordFocused || confirmPasswordValues
                  ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                  : "top-5 text-sm text-gray-400"
              }`}
            >
              비밀번호 확인
            </label>
            {errors.confirmPassword ? (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.confirmPassword.message}
              </p>
            ) : (
              <div className="min-h-[20px]">
                {confirmPasswordValues &&
                  passwordValues === confirmPasswordValues && (
                    <p className="text-sm font-light text-green-700">
                      비밀번호가 일치합니다.
                    </p>
                  )}
              </div>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={!isValid || isPending}
            className={`w-full h-[60px] py-3 rounded-md border border-blue-900 text-sm font-medium transition-colors mb-3
              ${
                !isValid || isPending
                  ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 cursor-pointer"
              }`}
          >
            회원가입
          </button>

          <div className="text-center mt-5">
            <p className="text-black">
              이미 계정이 있으신가요?&nbsp;
              <Link
                to="/login"
                className="text-blue-900 border-b-1 border-black pb-[1px] visited:text-black"
              >
                <span className="font-bold">로그인하러 가기</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
