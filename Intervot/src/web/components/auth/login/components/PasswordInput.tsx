import { UseFormRegister, FieldError } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

interface PasswordInputProps {
  register: UseFormRegister<LoginForm>;
  error?: FieldError;
  trigger: () => Promise<boolean>;
}

const PasswordInput = ({ register, error, trigger }: PasswordInputProps) => {
  return (
    <div>
      <label className="block font-light text-gray-400 mb-1">비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        {...register("password", {
          required: "비밀번호는 필수 입력값입니다.",
        })}
        onBlur={() => trigger()}
        className={`w-full p-3 border rounded-md mb-1 text-gray-700 bg-white border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-sm text-red-500 min-h-[20px]">{error.message}</p>
      )}
      {!error && <div className="min-h-[20px]" />}
    </div>
  );
};

export default PasswordInput;
