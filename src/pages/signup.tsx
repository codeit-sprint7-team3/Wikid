import React from 'react';
import SignUpForm from '@/components/SignUpForm';
import style from '@/styles/signup.module.css';
import Link from 'next/link';

const signUp = () => {
  return (
    <div className={style.container}>
      <h1 className={style.headerTitle}>회원가입</h1>
      <SignUpForm />
      <div className={style.bottom}>
        <span>이미 회원이신가요?</span>
        <Link href='/login' className={style.link}>
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default signUp;
