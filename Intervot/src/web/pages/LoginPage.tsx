import React from "react";
import { useForm } from "react-hook-form";
import logo from "@/shared/assets/edited_logo.png";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    mode: "onChange", // 입력이 변경될 때마다 유효성 검사
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="로고" className="w-36 h-auto object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이메일 입력 */}
          <div>
            <label className="block font-medium mb-1">이메일</label>
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

          {/* 비밀번호 입력 */}
          <div>
            <label className="block font-medium mb-1">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
              })}
              onBlur={() => trigger("password")}
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

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-md text-white ${
              isValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
