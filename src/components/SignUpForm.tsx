import api from "@/lib/axios";
import React, { FormEvent, useEffect, useState } from "react";

const SignUpForm = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formValue.email)) {
      setEmailError("잘못된 이메일 형식입니다");
      return;
    }
    if (formValue.password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이여야 합니다");
      return;
    }
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError("비밀번호가 일치하지 않습니다");
      return;
    }
    try {
      await api.post("/auth/signUp", formValue);
      setFormValue({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(formValue.email)) {
      setEmailError("잘못된 이메일 형식입니다");
    } else {
      setEmailError("");
    }
  };

  //비밀번호 길이 검사
  const handlePasswordBlur = () => {
    if (formValue.password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이여야 합니다");
    } else {
      setPasswordError("");
    }
  };

  //비밀번호 확인 검사
  const handlepasswordConfirmationBlur = () => {
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError("비밀번호가 일치하지 않습니다");
    } else {
      setPasswordConfirmationError("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">닉네임</label>
        <input
          onChange={handleInputChange}
          value={formValue.name}
          name="name"
          placeholder="닉네임을 입력해 주세요"
        />
        <label htmlFor="email">이메일</label>
        <input
          onBlur={handleEmailBlur}
          onChange={handleInputChange}
          value={formValue.email}
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
        />
        {emailError && <p>{emailError}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          onBlur={handlePasswordBlur}
          onChange={handleInputChange}
          value={formValue.password}
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        {passwordError && <p>{passwordError}</p>}
        <label htmlFor="passwordConfirmation">비밀번호 확인</label>
        <input
          onBlur={handlepasswordConfirmationBlur}
          onChange={handleInputChange}
          value={formValue.passwordConfirmation}
          type="password"
          name="passwordConfirmation"
          placeholder="비밀번호를 입력해 주세요"
        />
        {passwordConfirmationError && <p>{passwordConfirmationError}</p>}
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignUpForm;
