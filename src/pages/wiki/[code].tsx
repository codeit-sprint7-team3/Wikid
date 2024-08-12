import WikiLink from '@/components/link/WikiLink';
import QuizModal from '@/components/QuizModal';
import WikiProfile from '@/components/WikiProfile';
import useAuthStore from '@/store/AuthStore';
import useEditmodeStore from '@/store/EditStore';
import style from '@/styles/wiki.module.css'; // 스타일 파일을 적절히 수정합니다.
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
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.snackbar}>
          {!isEditable && (
            <div className={style.snackbarWarning}>
              <p>다른친구가 편집하고 있어요, 나중에 다시 시도해주세요</p>
            </div>
          )}
          <div>
            <h1>{profile.name}</h1>
            <WikiLink code={code} name='현재위키' />
          </div>
          {user?.id && profile.content && (
            <button
              className={style.startButton}
              onClick={handleStartClick}
              disabled={!isEditable}
            >
              {isEditable ? '위키 참여하기' : '편집 중ˑˑˑ'}
            </button>
          )}
        </div>
        <div className={style.wikiContent}>
          {profile.content ? (
            <div className={style.nonDataWrap}>
              <div
                dangerouslySetInnerHTML={{ __html: profile.content || '' }}
              />
            </div>
          ) : (
            <div className={style.nonDataWrap}>
              <p>아직 작성된 내용이 없네요. 위키에 참여해보세요!</p>
              <button
                className={style.startButton}
                onClick={handleStartClick}
                disabled={!isEditable}
              >
                시작하기
              </button>
            </div>
          )}
        </div>

        <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </div>

      <div className={style.profileContainer + style.right}>
        <WikiProfile profile={profile} />
      </div>
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