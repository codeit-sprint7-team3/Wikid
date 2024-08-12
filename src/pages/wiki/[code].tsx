import WikiLink from '@/components/link/WikiLink';
import QuizModal from '@/components/QuizModal';
import WikiProfile from '@/components/WikiProfile';
import useAuthStore from '@/store/AuthStore';
import useEditmodeStore from '@/store/EditStore';
import style from '@/styles/mywiki.module.css'; // 스타일 파일을 적절히 수정합니다.
import { Profile } from '@/types/UserType'; // Profile 인터페이스 임포트
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import basicApi from '@/lib/basicAxios';

interface WikiPageProps {
  profile: Profile | null;
  code: string;
}

const WikiPage = ({ profile, code }: WikiPageProps) => {
  const { checkAuth, user } = useAuthStore();
  const { isEditable, fetch, setProfile } = useEditmodeStore((state) => ({
    isEditable: state.isEditable,
    fetch: state.fetchPing,
    setProfile: state.setProfile,
  }));

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    user?.id && useEditmodeStore.getState().init(code, user?.id);
    profile && setProfile(profile);
  }, [code, user, profile, setProfile]);

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleStartClick = async () => {
    if (!(await fetch())) return;
    setIsQuizOpen(true);
  };

  if (!profile) {
    return <div>프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.contentContainer}>
      <div className={style.topContainer}>
        <div className={style.subjectContainer}>
          {!isEditable && (
            <div className={style.snackbarWarning}>
              <p>다른 친구가 편집하고 있어요, 나중에 다시 시도해 주세요.</p>
            </div>
          )}
          <h2 className={style.h2}>{profile.name}</h2>
          <button
            className={style.button}
            onClick={handleStartClick}
            disabled={!isEditable}
          >
            {isEditable ? '위키 참여하기' : '편집 중ˑˑˑ'}
          </button>
        </div>
        <div className={style.link}>
          <WikiLink name={profile.name} code={code} />
        </div>
      </div>
      <div className={style.profileContainer}>
        <WikiProfile profile={profile} />
      </div>
      {profile.content ? (
        <div className={style.description}>
          <span
            dangerouslySetInnerHTML={{ __html: profile.content || '' }}
          ></span>
        </div>
      ) : (
        <div className={style.nonDataWrap}>
          <p>아직 작성된 내용이 없네요.</p>
          <p>위키에 참여해 보세요!</p>
          <button
            className={style.button}
            onClick={handleStartClick}
            disabled={!isEditable}
          >
            시작하기
          </button>
        </div>
      )}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params!;
  try {
    const response = await basicApi.get(`/profiles/${code}`);
    const profile: Profile = response.data;

    return {
      props: {
        profile,
        code,
      },
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      props: {
        profile: null,
        code: null,
      },
    };
  }
};

export default WikiPage;
