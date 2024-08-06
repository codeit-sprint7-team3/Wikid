import authAxios from '@/lib/authAxios';
import { ChangeEvent, FormEvent, useState } from 'react';
import Profiles from '@/components/mypage/Profile';
import useAuthStore from '@/store/AuthStore';

interface formValues {
  securityAnswer: string;
  securityQuestion: string;
}
const CreateWiki = () => {
  const [formValue, setFormValue] = useState<formValues>({
    securityAnswer: '',
    securityQuestion: '',
  });
  const [code, setCode] = useState('');
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await authAxios.post('/profiles', formValue);
      const { code, id } = res.data;
      alert('프로필 생성이 완료되었습니다.');
      setProfile(code, id);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === '이미 프로필이 존재합니다.') {
          alert('이미 프로필이 존재합니다');
        }
      } else {
        console.log(error);
        alert('프로필 생성에 실패했습니다');
      }
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
      {code ? null : (
        <form onSubmit={handleSubmit}>
          <label>위키 생성하기</label>
          <input
            value={formValue.securityQuestion}
            onChange={handleInputChange}
            name='securityQuestion'
            placeholder='질문을 입력해 주세요'
          />
          <input
            value={formValue.securityAnswer}
            onChange={handleInputChange}
            name='securityAnswer'
            placeholder='답을 입력해 주세요'
          />
          <button type='submit'>생성하기</button>
        </form>
      )}
    </>
  );
};

export default CreateWiki;
