import WikiProfile from '@/components/WikiProfile';
import style from '@/styles/mywiki.module.css';
import WikiLink from '@/components/link/WikiLink';
import Link from 'next/link';

const Wiki = () => {
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
          <div>
            <h3 className={style.h3}>01. 개요</h3>
            <p></p>
          </div>
          <div>
            <h3 className={style.h3}>02. 취미</h3>
            <p></p>
          </div>
          <div>
            <h3 className={style.h3}>03. 여담</h3>
            <p></p>
          </div>
          <div>
            <h3 className={style.h3}>04. 취향</h3>
            <p></p>
          </div>
        </div>
      </div>
      <div className={style.rightContainer}>
        <WikiProfile />
      </div>
    </div>
  );
};

export default Wiki;
