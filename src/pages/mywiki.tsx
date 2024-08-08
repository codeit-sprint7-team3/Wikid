import { useRouter } from 'next/router';
import WikiProfile from '@/components/WikiProfile';
import style from '@/styles/mywiki.module.css';
import WikiLink from '@/components/link/WikiLink';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Wiki = () => {
  const router = useRouter();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.content) {
      setContent(router.query.content as string);
    }
  }, [router.query]);

  return (
    <div className={style.contentContainer}>
      <div className={style.leftContainer}>
        <div className={style.topContainer}>
          <div className={style.subjectContainer}>
            <h2 className={style.h2}>이지동</h2>
            <Link href='/edit'>
              <button className={style.button}>위키 참여하기</button>
            </Link>
          </div>
          <WikiLink name='wikicode' code='' />
        </div>
        <div className={style.description}>
          <span dangerouslySetInnerHTML={{ __html: content || '' }}></span>
        </div>
      </div>
      <div className={style.rightContainer}>
        <WikiProfile />
      </div>
    </div>
  );
};

export default Wiki;
