import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupForm>({
    mode: "onChange", // 입력값 변경 시 유효성 체크
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: SignupForm) => {
    const { email, nickname, password } = data;

    const signupRequestData: SignupRequest = {
      email,
      nickname,
      password,
    };

    console.log(signupRequestData);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mb-30">
      <h1 className="text-3xl font-bold mb-4 mt-20">회원가입</h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이메일 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              이메일
            </label>
            <input
              type="email"
              {...register("email", {
                required: "이메일은 필수 입력값입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일을 입력해주세요.",
                },
              })}
              placeholder="이메일을 입력해 주세요"
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

          {/* 닉네임 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              닉네임
            </label>
            <input
              type="text"
              {...register("nickname", {
                required: "닉네임은 필수 입력값입니다.",
                maxLength: {
                  value: 6,
                  message: "닉네임은 6글자 이하로 입력해주세요.",
                },
              })}
              placeholder="6글자 이하의 닉네임을 입력해 주세요"
              className={`w-full p-3 border rounded-md mb-1 text-gray-700 bg-white border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 ${
                errors.nickname ? "border-red-500" : ""
              }`}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.nickname.message}
              </p>
            )}
            {!errors.nickname && <div className="min-h-[20px]" />}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
                },
              })}
              placeholder="비밀번호를 입력해 주세요"
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

          {/* 비밀번호 확인 */}
          <div>
            <label className="block font-light text-gray-400 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수 입력값입니다.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호를 다시 입력해 주세요"
              className={`w-full p-3 border rounded-md mb-1 text-gray-700 bg-white border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword ? (
              <p className="text-sm text-red-500 min-h-[20px]">
                {errors.confirmPassword.message}
              </p>
            ) : (
              <div className="min-h-[20px]">
                {confirmPassword && password === confirmPassword && (
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
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-md border border-blue-900 text-sm font-medium transition-colors mb-3
              ${
                !isValid || isSubmitting
                  ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50"
              }`}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
