import { GetServerSideProps } from 'next';
import basicApi from '@/lib/basicAxios';
import { useRouter } from 'next/router';
import WikiProfile from '@/components/WikiProfile';
import style from '@/styles/mywiki.module.css';
import WikiLink from '@/components/link/WikiLink';

interface WikiPageProps {
  code: string;
  content: string | null;
  name: string;
}

const WikiPage = ({ code, content, name }: WikiPageProps) => {
  const router = useRouter();

  return (
    <div className={style.contentContainer}>
      <div className={style.leftContainer}>
        <div className={style.topContainer}>
          <div className={style.subjectContainer}>
            <h2 className={style.h2}>{name}</h2>
            <button
              className={style.button}
              onClick={() => router.push(`/wiki/${code}/edit`)}
            >
              위키 참여하기
            </button>
          </div>
          <WikiLink name={name} code={code} />
        </div>
        <div className={style.description}>
          <span dangerouslySetInnerHTML={{ __html: content || '' }}></span>{' '}
        </div>
      </div>
      <div className={style.rightContainer}>
        <WikiProfile />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;

  if (!code || Array.isArray(code)) {
    return { notFound: true };
  }

  try {
    const response = await basicApi.get(`/profiles/${code}`);
    const { content, name } = response.data;

    const safeContent = content !== undefined ? content : null;

    return { props: { code, content: safeContent, name } };
  } catch (error) {
    console.error('실패', error);
    return { notFound: true };
  }
};

export default WikiPage;
