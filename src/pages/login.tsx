import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UseAuthStore from '@/store/AuthStore';
import style from '@/styles/login.module.css';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const { isPending, signIn } = UseAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      const success = await signIn(email, password);
      if (success) {
        router.push('/me');
      } else {
        // 에러 처리
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  //axios를 통신하는 동안 button을 다시 클릭할 수 없는 로직 필요

  const handleGoRegister = () => {
    router.push('/register');
  };

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
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={isPending}>
          로그인
        </button>
      </form>
      <p onClick={handleGoRegister}>회원가입</p>
    </div>
  );
};

export default Login;