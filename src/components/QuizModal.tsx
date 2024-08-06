import React, { useState } from 'react';
import style from '@/styles/quizModal.module.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string) => void;
  question: string;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSubmit, question }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button className={style.closeButton} onClick={onClose}>×</button>
        <div className={style.modalHeader}>
          <h2>다음 퀴즈를 맞추고<br/>위키를 작성해 보세요.</h2>
        </div>
        <div className={style.modalBody}>
          <p className={style.question}>{question}</p>
          <input 
            type="text" 
            placeholder="답안을 입력해 주세요" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            className={style.answerInput} 
          />
          <button className={style.submitButton} onClick={handleSubmit}>확인</button>
        </div>
        <p className={style.footerText}>위키드는 지인들과 함께하는 즐거운 공간입니다. 지인에게 상처를 주지 않도록 작성해 주세요.</p>
      </div>
    </div>
  );
};

export default QuizModal;
