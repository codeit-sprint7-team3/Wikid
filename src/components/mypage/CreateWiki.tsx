import authAxios from '@/lib/authAxios';
import { ChangeEvent, FormEvent, useState } from 'react';
import Profiles from '@/components/mypage/Profile';
import useAuthStore from '@/store/AuthStore';
import { Router } from 'next/router';
import { useRouter } from 'next/router';
import QuizModal from '@/components/QuizModal';

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
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const setProfile = useAuthStore((state) => state.setProfile);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsQuizOpen(true);
  };

  const handleQuizSubmit = async (answer: string) => {
    console.log('정답 입력:', answer);
    console.log('올바른 정답:', formValue.securityAnswer);

    if (answer.trim().toLowerCase() !== formValue.securityAnswer.trim().toLowerCase()) {
      return; // 정답이 아닐 경우 아무 작업도 하지 않음
    }
    try {
      const res = await authAxios.post('/profiles', formValue);
      const { code, id, securityAnswer } = res.data; // 응답 데이터에 securityAnswer 포함
      console.log('프로필 생성 성공:', res.data); // 응답 데이터를 콘솔에 출력
      alert('프로필 생성이 완료되었습니다.');
      setProfile(code, id, securityAnswer);
      router.push(`/wiki/${code}`); // 프로필 생성 후 해당 페이지로 리디렉션
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
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        question={formValue.securityQuestion}
        correctAnswer={formValue.securityAnswer}
        onSubmit={handleQuizSubmit}
      />
    </>
  );
};

export default CreateWiki;