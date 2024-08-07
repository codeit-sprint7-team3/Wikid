import authAxios from '@/lib/authAxios';
import { ChangeEvent, FormEvent, useState } from 'react';
import useAuthStore from '@/store/AuthStore';
import style from '@/styles/mypage.module.css';

interface formValues {
  securityAnswer: string;
  securityQuestion: string;
}
const CreateWiki = () => {
  const [formValue, setFormValue] = useState<formValues>({
    securityAnswer: '',
    securityQuestion: '',
  });
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await authAxios.post('/profiles', formValue);
      const { code, id } = res.data;
      alert('프로필 생성이 완료되었습니다.');
      setProfile(code, id);
    } catch (error: any) {
      console.log(error);
      alert('프로필 생성에 실패했습니다');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>위키 생성하기</label>
        <input
          className={style.input}
          value={formValue.securityQuestion}
          onChange={handleInputChange}
          name='securityQuestion'
          placeholder='질문을 입력해 주세요'
        />
        <input
          className={style.input}
          value={formValue.securityAnswer}
          onChange={handleInputChange}
          name='securityAnswer'
          placeholder='답을 입력해 주세요'
        />
        <button className={style.submitBtn} type='submit'>
          생성하기
        </button>
      </form>
    </>
  );
};

export default CreateWiki;
