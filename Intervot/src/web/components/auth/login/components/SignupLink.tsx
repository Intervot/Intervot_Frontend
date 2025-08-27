import { Link } from "react-router-dom";

const SignupLink = () => {
  return (
    <div className="text-center">
      <p className="text-gray-600">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="text-blue-900 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default SignupLink;
