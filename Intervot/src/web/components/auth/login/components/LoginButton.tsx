interface LoginButtonProps {
  isValid: boolean;
  isLoading: boolean;
}

const LoginButton = ({ isValid, isLoading }: LoginButtonProps) => {
  return (
    <button
      type="submit"
      disabled={!isValid || isLoading}
      className={`w-full py-3 rounded-md border border-blue-900 text-sm font-medium transition-colors mb-3
        ${
          !isValid || isLoading
            ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
            : "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 cursor-pointer"
        }`}
    >
      로그인
    </button>
  );
};

export default LoginButton;
