import React, { useState, useEffect } from "react";
import logo from "@/shared/assets/edited_logo.png";

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 회원가입 유효성 검사
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleBlur = (field: string) => {
    let error = "";
    switch (field) {
      case "email":
        if (!form.email) error = "이메일은 필수 입력값입니다.";
        else if (!validateEmail(form.email))
          error = "유효한 이메일을 입력해주세요.";
        break;
      case "nickname":
        if (!form.nickname) error = "닉네임은 필수 입력값입니다.";
        else if (form.nickname.length > 6)
          error = "닉네임은 6글자 이하로 입력해주세요.";
        break;
      case "password":
        if (!form.password) error = "비밀번호는 필수 입력값입니다.";
        else if (!validatePassword(form.password))
          error =
            "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
        break;
      case "confirmPassword":
        if (!form.confirmPassword) error = "비밀번호 확인은 필수 입력값입니다.";
        else if (form.password !== form.confirmPassword)
          error = "비밀번호가 일치하지 않습니다.";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호는 필수 입력값입니다.",
        }));
      } else if (!validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }

    if (name === "confirmPassword") {
      const match = value === form.password;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value
          ? match
            ? ""
            : "비밀번호가 일치하지 않습니다."
          : "비밀번호 확인은 필수 입력값입니다.",
      }));
      setConfirmPasswordMatch(match && value ? "비밀번호가 일치합니다." : "");
    }

    if (name !== "password" && name !== "confirmPassword") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => !err);
    const allFieldsFilled = Object.values(form).every((val) => val !== "");
    const nicknameValid = form.nickname.length <= 6;
    const passwordValid = validatePassword(form.password);
    const passwordsMatch = form.password === form.confirmPassword;
    const emailValid = validateEmail(form.email);

    setIsFormValid(
      noErrors &&
        allFieldsFilled &&
        nicknameValid &&
        passwordValid &&
        passwordsMatch &&
        emailValid
    );
  }, [form, errors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.keys(form).forEach((field) => handleBlur(field));
    if (isFormValid) {
      alert("회원가입 완료");
      console.log(form);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="로고" className="w-36 h-auto object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">이메일</label>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={form.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              className={`w-full p-3 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">닉네임</label>
            <input
              type="text"
              name="nickname"
              placeholder="6글자 이하의 닉네임을 입력해 주세요"
              value={form.nickname}
              onChange={handleChange}
              onBlur={() => handleBlur("nickname")}
              className={`w-full p-3 border rounded-md ${
                errors.nickname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500 mt-1">{errors.nickname}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={form.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              className={`w-full p-3 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur("confirmPassword")}
              className={`w-full p-3 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {confirmPasswordMatch && !errors.confirmPassword && (
              <p className="text-sm text-gray-500 mt-1">
                {confirmPasswordMatch}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-md text-white ${
              isFormValid
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
