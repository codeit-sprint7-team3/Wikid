import useAuthStore from '@/store/AuthStore';
import useEditmodeStore from '@/store/EditStore';
import style from '@/styles/quizModal.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import lockIcon from '@/assets/icon/type=lock.svg';
import closeIcon from '@/assets/icon/type=close.svg';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  const { profile, update, code, setProfile } = useEditmodeStore((state) => ({
    update: state.updatePing,
    code: state.code,
    profile: state.profile,
    setProfile: state.setProfile,
  }));

  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter();
  const checkAnswer = useCallback(async () => {
    const res = await update(answer);

    if (res.code === 200) {
      setFeedback('정답입니다!');
      setProfile({ ...profile, securityAnswer: answer });
      router.push(`/edit/${code}`);
    } else {
      //code가 400일경우에만 정답x,
      setFeedback('틀렸습니다!');
    }
  }, [answer, code, profile, router, setProfile, update]);

  if (!isOpen) return null;

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <button
          className={style.closeButton}
          onClick={onClose}
        >
          <Image
            src={closeIcon}
            alt='닫기버튼'
            width={20}
            height={20}
          />
        </button>
        <div className={style.headerWarpper}>
          <Image
            className={style.lockIcon}
            src={lockIcon}
            alt='자물쇠아이콘'
            width={20}
            height={20}
          />
          <p className={style.headerText}>
            다음 퀴즈를 맞추고
            <br /> 위키를 작성해 보세요.
          </p>
        </div>

        <h2 className={style.securityQuestion}>{profile.securityQuestion}</h2>
        <input
          type='text'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder='답안을 입력해 주세요'
          className={style.input}
        />
        <button
          onClick={checkAnswer}
          className={style.submitButton}
        >
          확인
        </button>
        {feedback && <p className={style.feedback}>{feedback}</p>}
        <br />
        <br />
        <p className={style.bottomText}>
          위키드는 지인들과 함께하는 즐거운 공간입니다.
          <br /> 지인에게 상처를 주지 않도록 작성해 주세요.
        </p>
      </div>
    </div>
  );
};

export default QuizModal;
