import React, { useEffect, useState } from "react";
import style from "@/styles/quizModal.module.css";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  correctAnswer: string | undefined;
  onSubmit: (answer: string) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  question,
  correctAnswer,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    console.log("올바른 정답:", correctAnswer);
  }, [correctAnswer]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (
      correctAnswer &&
      answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    ) {
      setFeedback("정답입니다!");
    } else {
      setFeedback("틀렸습니다!");
    }
    onSubmit(answer);
    window.location.reload();
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{question}</h2>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답안을 입력해 주세요"
          className={style.input}
        />
        <button onClick={handleSubmit} className={style.submitButton}>
          확인
        </button>
        {feedback && <p className={style.feedback}>{feedback}</p>}
        <br />
        <br />
        <p>
          위키드는 지인들과 함께하는 즐거운 공간입니다. 지인에게 상처를 주지
          않도록 작성해 주세요.
        </p>
      </div>
    </div>
  );
};

export default QuizModal;
