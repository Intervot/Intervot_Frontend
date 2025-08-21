import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services/auth/authServices";
import axios from "axios";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

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
    trigger,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* 이메일 입력 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              {...register("email", {
                required: "이메일은 필수 입력값입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일을 입력해주세요.",
                },
              })}
              onBlur={() => trigger("email")}
              className={`w-full p-3 border rounded-md mb-1 text-gray-700 bg-white border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.email.message}
              </p>
            )}
            {!errors.email && <div className="min-h-[20px]" />}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
              })}
              onBlur={() => trigger("password")}
              className={`w-full p-3 border rounded-md mb-1 text-gray-700 bg-white border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
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
            className={`w-full py-3 rounded-md border border-blue-900 text-sm font-medium transition-colors mb-3
              ${
                !isValid || isSubmitting || isPending
                  ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 cursor-pointer"
              }`}
          >
            로그인
          </button>

          {/* 회원가입 링크 */}
          <div className="text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link to="/signup" className="text-blue-900 hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
