import { useForm } from "react-hook-form";
import logo from "@/shared/assets/edited_logo.png";
import { useNavigate } from "react-router-dom";

type SignupFormValues = {
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
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    mode: "onChange", // 입력값 변경 시 유효성 체크
  });

  const password = watch("password");

  const onSubmit = (data: SignupRequest) => {
    console.log(data);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="로고" className="w-36 h-auto object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이메일 */}
          <div>
            <label className="block font-medium mb-1">이메일</label>
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
              className={`w-full p-3 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block font-medium mb-1">닉네임</label>
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
              className={`w-full p-3 border rounded-md ${
                errors.nickname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block font-medium mb-1">비밀번호</label>
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
              className={`w-full p-3 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block font-medium mb-1">비밀번호 확인</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수 입력값입니다.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호를 다시 입력해 주세요"
              className={`w-full p-3 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword ? (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            ) : (
              watch("confirmPassword") &&
              password === watch("confirmPassword") && (
                <p className="text-sm text-gray-500 mt-1">
                  비밀번호가 일치합니다.
                </p>
              )
            )}
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-md text-white ${
              isValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
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
