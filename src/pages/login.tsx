import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAuthStore from '@/store/AuthStore';
import style from '@/styles/login.module.css';
import useCheckLogin from '@/hooks/useCheckLogin';
import { ValidateEmail } from '@/utils/ValidateEmail';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { clientUser, isLoading } = useCheckLogin();
  const { signIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const isEmailValid = ValidateEmail(values.email);
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
    if (!ValidateEmail(values.email)) {
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
        router.push('/');
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

  if (isLoading) {
    return null;
  } else if (!isLoading && clientUser) {
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
          style={{
            backgroundColor: emailError ? 'var(--red100)' : 'var(--gray100)',
          }}
        />
        {emailError && <p className={style.ErrorMessage1}>{emailError}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={values.password}
          onChange={handleChange}
          style={{
            backgroundColor: passwordError ? 'var(--red100)' : 'var(--gray100)',
          }}
        />
        {passwordError && (
          <p className={style.ErrorMessage2}>{passwordError}</p>
        )}
        <button
          className={style.subButton}
          type="submit"
          disabled={isButtonDisabled}
        >
          로그인
        </button>
      </form>
      <Link href="/signup">
        <p className={style.goRegister}>회원 가입</p>
      </Link>
    </div>
  );
};

export default Login;
