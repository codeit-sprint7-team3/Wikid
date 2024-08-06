import { ChangeEvent, FormEvent, useState } from 'react';
import authAxios from '@/lib/authAxios';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/router';

interface formValues {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const UpdatePasswordForm: React.FC = () => {
  const [formValue, setFormValue] = useState<formValues>({
    passwordConfirmation: '',
    password: '',
    currentPassword: '',
  });
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  const { signOut } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue.password !== '') {
      if (formValue.currentPassword === formValue.password) {
        setPasswordError('기존과 동일한 비밀번호입니다');
        return;
      }
    }
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다');
      return;
    }
    if (formValue.password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이여야 합니다');
      return;
    }
    try {
      await authAxios.patch('/users/me/password', formValue);
      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
      signOut();
      router.replace('/');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (errorMessage === '비밀번호가 일치하지 않습니다.') {
        setCurrentPasswordError('기존 비밀번호가 일치하지 않습니다');
      } else if (errorMessage === '비밀번호 확인 값이 일치하지 않습니다.') {
        setPasswordConfirmationError('비밀번호가 일치하지 않습니다');
      } else {
        console.log(error);
        console.log('비밀번호 변경에 실패했습니다');
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
      case 'passwordConfirmation':
        setPasswordConfirmationError('');
        break;
      case 'password':
        setPasswordError('');
        break;
      case 'currentPassword':
        setCurrentPasswordError('');
        break;
      default:
        break;
    }
  };

  //비밀번호 길이 검사
  const handlePasswordBlur = () => {
    if (formValue.password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이여야 합니다');
    }
    if (formValue.password !== '') {
      if (formValue.currentPassword === formValue.password) {
        setPasswordError('기존과 동일한 비밀번호입니다');
      }
    }
  };

  //비밀번호 확인 검사
  const handlePasswordConfirmationBlur = () => {
    if (formValue.password !== formValue.passwordConfirmation) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>비밀번호 변경</label>
        <input
          onChange={handleInputChange}
          value={formValue.currentPassword}
          name='currentPassword'
          type='password'
          placeholder='기존 비밀번호'
        />
        {currentPasswordError && <p>{currentPasswordError}</p>}
        <input
          onBlur={handlePasswordBlur}
          onChange={handleInputChange}
          value={formValue.password}
          name='password'
          type='password'
          placeholder='새 비밀번호'
        />
        {passwordError && <p>{passwordError}</p>}
        {}
        <input
          onBlur={handlePasswordConfirmationBlur}
          onChange={handleInputChange}
          value={formValue.passwordConfirmation}
          name='passwordConfirmation'
          type='password'
          placeholder='새 비밀번호 확인'
        />
        {passwordConfirmationError && <p>{passwordConfirmationError}</p>}
        <button type='submit'>변경하기</button>
      </form>
    </>
  );
};

export default UpdatePasswordForm;
