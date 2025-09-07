import { UseFormRegister, FieldError } from "react-hook-form";
import { LoginFormData } from "@/shared/types/auth/login";

interface LoginPasswordInputProps {
  register: UseFormRegister<LoginFormData>;
  error?: FieldError;
}

const LoginPasswordInput = ({ register, error }: LoginPasswordInputProps) => {
  return (
    <div>
      <label className="block font-light text-gray-400 mb-1">비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        {...register("password", {
          required: "비밀번호는 필수 입력값입니다.",
        })}
        className={`w-full p-3 border rounded-md mb-1 border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-0 transition-colors duration-150 ${
          error ? "border-red-500" : "focus:border-gray-400"
        }`}
      />
      <div className="min-h-[20px]">
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default LoginPasswordInput;
