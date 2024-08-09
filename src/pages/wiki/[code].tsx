import { GetServerSideProps } from 'next';
import authAxios from '@/lib/authAxios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/styles/wiki.module.css'; // 스타일 파일을 적절히 수정합니다.
import basicProfile from '@/assets/header/basicUserProfile.png'; // 기본 프로필 이미지
import { useState } from 'react';
import QuizModal from '@/components/QuizModal';
import { Profile } from '@/types/UserType'; // Profile 인터페이스 임포트

interface WikiProps {
  profile: Profile | null;
}

const WikiPage = ({ profile }: WikiProps) => {
  const router = useRouter();
  const { code } = router.query;
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleStartClick = () => {
    setIsQuizOpen(true);
  };

  const handleQuizSubmit = (answer: string) => {
    console.log('정답 입력:', answer);
    console.log('올바른 정답:', profile?.securityAnswer);

    if (profile?.securityAnswer && answer.trim().toLowerCase() === profile.securityAnswer.trim().toLowerCase()) {
      alert('정답입니다!');
    } else {
      alert('틀렸습니다!');
    }
    setIsQuizOpen(false);
  };

  if (!profile) {
    return <div>프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.container}>
      <h1>{profile.name}</h1>
      <div className={style.profileContainer}>
        <Image
          src={profile.image || basicProfile}
          alt="프로필 이미지"
          width={150}
          height={150}
          className={style.profileImage}
        />
        <div className={style.profileDetails}>
          <p>거주 도시: {profile.city}</p>
          <p>MBTI: {profile.mbti}</p>
          <p>직업: {profile.job}</p>
          <p>SNS 계정: {profile.sns}</p>
          <p>생일: {profile.birthday}</p>
          <p>별명: {profile.nickname}</p>
          <p>혈액형: {profile.bloodType}</p>
          <p>국적: {profile.nationality}</p>
        </div>
      </div>
      <div className={style.wikiContent}>
        <p>아직 작성된 내용이 없네요. 위키에 참여해보세요!</p>
        <button className={style.startButton} onClick={handleStartClick}>시작하기</button>
      </div>
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        question={profile.securityQuestion}
        correctAnswer={profile.securityAnswer}
        onSubmit={handleQuizSubmit}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params as { code: string };

  try {
    const res = await authAxios.get(`/profiles/${code}`);
    const profile = res.data;

    console.log('프로필 데이터:', profile); // 프로필 데이터 확인

    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    console.error('프로필 가져오기 실패:', error);
    return {
      props: {
        profile: null,
      },
    };
  }
};

export default WikiPage;