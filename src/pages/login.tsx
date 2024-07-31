import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UseAuthStore from '@/store/AuthStore';
import style from '@/styles/login.module.css';
import useCheckLogin from '@/hooks/useCheckLogin';

// 이메일 유효성 검사 함수
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(''); // 이메일 에러
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 에러
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 비활성화
  const { user } = useCheckLogin();
  const { signIn } = UseAuthStore();
  const router = useRouter();

  useEffect(() => {
    //버튼을 활성화
    const isEmailValid = validateEmail(values.email);
    const isPasswordValid = values.password.length >= 8;
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setPasswordError('');
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailCheckBlur = () => {
    // 포커스 아웃 시 이메일 유효성 검사
    if (!validateEmail(values.email)) {
      setEmailError('잘못된 이메일 형식입니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const { email, password } = values;
      const success = await signIn(email, password);
      if (success) {
        router.push('/me');
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (errorMessage === '존재하지 않는 이메일입니다.') {
        setEmailError('존재하지 않는 이메일입니다.');
      } else if (errorMessage === '비밀번호가 일치하지 않습니다.') {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        alert('서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
        router.replace('/');
      }
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  if (user) {
    router.replace('/');
  }

  return (
    <div className={style.LoginContainer}>
      <p className={style.LoginTitle}>로그인</p>
      <form onSubmit={handleSubmit} className={style.LoginForm}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleEmailCheckBlur}
        />
        {emailError && <p className={style.ErrorMessage}>{emailError}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {passwordError && <p className={style.ErrorMessage}>{passwordError}</p>}
        <button type="submit" disabled={isButtonDisabled}>
          로그인
        </button>
      </form>
      <p onClick={navigateToRegister}>회원 가입</p>
    </div>
  );
};

export default Login;
