import React, { useState } from 'react';
import style from '@/styles/mypage.module.css';
import { useRouter } from 'next/router';

const MyPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleCreateWiki = () => {
    // 여기서 질문과 답변 데이터를 저장하고 no-content 페이지로 이동
    localStorage.setItem('quizQuestion', question);
    localStorage.setItem('quizAnswer', answer);
    router.push('/wiki-page/no-content');
  };

  return (
    <div className={style.container}>
      <div className={style.formGroup}>
        <label>질문을 입력해 주세요</label>
        <input 
          type="text" 
          value={question} 
          onChange={handleQuestionChange} 
          placeholder="질문을 입력해 주세요" 
          className={style.input} 
        />
      </div>
      <div className={style.formGroup}>
        <label>답을 입력해 주세요</label>
        <input 
          type="text" 
          value={answer} 
          onChange={handleAnswerChange} 
          placeholder="답을 입력해 주세요" 
          className={style.input} 
        />
      </div>
      <button className={style.button} onClick={handleCreateWiki}>생성하기</button>
    </div>
  );
};

export default MyPage;
