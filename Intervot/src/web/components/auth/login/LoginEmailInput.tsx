import { UseFormRegister, FieldError } from "react-hook-form";
import { LoginFormData } from "@/shared/types/auth/login";

interface LoginEmailInputProps {
  register: UseFormRegister<LoginFormData>;
  error?: FieldError;
}

const LoginEmailInput = ({ register, error }: LoginEmailInputProps) => {
  return (
    <div>
      <label className="block font-light text-gray-400 mb-1">이메일</label>
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
        className={`w-full p-3 border rounded-md mb-1 border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-0 transition-colors duration-150 ${
          error ? "border-red-500" : ""
        }`}
      />
      <div className="min-h-[20px]">
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default LoginEmailInput;
