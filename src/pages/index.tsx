import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/home.module.css';
import {
  AlarmImg,
  BellImg,
  DialogueImg,
  InfoImg,
  IntroImg,
  PhoneImg,
  ProfileImg,
  SpeakerImg,
  TypingImg,
  WikiImg,
} from '@/assets/home';

const Home = () => {
  return (
    <>
      <div className={style.body}>
        <section className={style.introSection}>
          <h1 className={style.introWrapper}>
            <div className={style.introFont300}>남들이 만드는</div>
            <div className={style.introFont700}>나만의 위키</div>
          </h1>
          <button className={style.createButton}>
            {/* <Link href='위키생성페이지'>위키 만들기</Link> */}
            위키 만들기
          </button>
          <Image className={style.profileImg} src={ProfileImg} alt='프로필' />
        </section>
        <section className={style.writeSection}>
          <div className={style.writeWrapper}>
            <div className={style.h2Wrapper}>
              <h2 className={style.h2}>WRITE</h2>
              <p className={style.p}>
                친구의 위키,
                <br /> 직접 작성해 봐요
              </p>
            </div>
            <div className={style.imageWrapper}>
              <Image className={style.typingImg} src={TypingImg} alt='키보드' />
            </div>
          </div>
          <Image className={style.introImg} src={IntroImg} alt='인트로' />
        </section>
        <section className={style.shareSection}>
          <div className={style.h2Wrapper}>
            <h2 className={style.h2}>SHARE</h2>
            <p className={style.p}>
              내 위키 만들고
              <br /> 친구에게 공유해요
            </p>
          </div>
          <div className={style.iconWrapper}>
            <Image className={style.speakerImg} src={SpeakerImg} alt='확성기' />
            <Image className={style.wikiImg} src={WikiImg} alt='위키' />
            <Image className={style.phoneImg} src={PhoneImg} alt='핸드폰' />
            <Image className={style.dialogueImg} src={DialogueImg} alt='말풍선' />
          </div>
        </section>
        <section className={style.viewSection}>
          <div className={style.h2Wrapper}>
            <h2 className={style.h2}>VIEW</h2>
            <p className={style.p}>
              친구들이 달아준 <br />
              내용을 확인해 봐요
            </p>
          </div>
          <div className={style.viewContainer}>
            <Image className={style.infoImg} src={InfoImg} alt='확성기' />
            <div className={style.viewWrapper}>
              <Image className={style.bellImg} src={BellImg} alt='위키' />
              <Image className={style.alarmImg} src={AlarmImg} alt='핸드폰' />
            </div>
          </div>
        </section>
        <section className={style.startSection}>
          <h2>나만의 위키 만들어 보기</h2>
          <button className={style.startButton}>
            <Link href='/login'>지금 시작하기</Link>
          </button>
        </section>
      </div>
      <footer className={style.footer}>
        <div className={style.footerWrapper}>
          <strong>Copyright ⓒ Wikied. All Rights Reserved</strong>
          <p>
            사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은
            <br />
            서울특별시 중구 청계천로 123, 위키드빌딩
          </p>
          <div className={style.textWrapper}>
            <p>서비스 이용약관</p>
            <p>개인정보 취급방침 </p>
            <p>전자금융거래 기본약관 </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
