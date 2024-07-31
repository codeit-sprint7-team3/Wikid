import api from "@/lib/axios";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface formValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<formValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateName(formValue.name)) {
      setNameError("닉네임은 10자 내로 입력해주세요");
      return;
    }
    if (!validateEmail(formValue.email)) {
      setEmailError("잘못된 이메일 형식입니다");
      return;
    }
    if (formValue.password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이여야 합니다");
      return;
    }
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError("비밀번호가 일치하지 않습니다");
      return;
    }
    try {
      await api.post("/auth/signUp", formValue);
      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === "이미 사용중인 이메일입니다.") {
          setEmailError("이미 사용중인 이메일입니다");
        }
      } else if (error.response && error.response.status === 500) {
        if (error.response.data.message === "Internal Server Error") {
          setNameError("이미 사용중인 닉네임입니다");
        }
      } else {
        console.log("회원가입에 실패했습니다");
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case "name":
        setNameError("");
        break;
      case "email":
        setEmailError("");
        break;
      case "password":
        setPasswordError("");
        break;
      case "passwordConfirmation":
        setPasswordConfirmationError("");
        break;
      default:
        break;
    }
  };

  //닉네임 유효성 검사
  const validateName = (name: string) => {
    return name.length > 1 && name.length <= 10;
  };

  const handleNameBlur = () => {
    if (!validateName(formValue.name)) {
      setNameError("닉네임은 10자 내로 입력해주세요");
    }
  };

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(formValue.email)) {
      setEmailError("잘못된 이메일 형식입니다");
    }
  };

  //비밀번호 길이 검사
  const handlePasswordBlur = () => {
    if (formValue.password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이여야 합니다");
    }
  };

  //비밀번호 확인 검사
  const handlePasswordConfirmationBlur = () => {
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError("비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">닉네임</label>
        <input
          onBlur={handleNameBlur}
          onChange={handleInputChange}
          value={formValue.name}
          name="name"
          placeholder="닉네임을 입력해 주세요"
        />
        {nameError && <p>{nameError}</p>}
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
          onBlur={handlePasswordConfirmationBlur}
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
