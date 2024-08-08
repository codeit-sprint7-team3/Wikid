import Image from 'next/image';
import WikiProfileImg from '@/assets/mywiki/wikiProfile.png';
import style from '@/styles/wikiprofile.module.css';

const WikiProfile = () => {
  return (
    <div className={style.wrapper}>
      <Image
        src={WikiProfileImg}
        alt='프로필 이미지'
        className={style.wikiProfileImg}
        priority
      />
      <div className={style.profileDetails}>
        <div className={style.profileItem}>
          <span className={style.label}>거주 도시</span>
          <span className={style.value}>서울</span>
        </div>
        <div className={style.profileItem}>
          <span className={style.label}>MBTI</span>
          <span className={style.value}>INFJ</span>
        </div>
        <div className={style.profileItem}>
          <span className={style.label}>직업</span>
          <span className={style.value}>코드잇 콘텐츠 프로듀서</span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>SNS 계정</span>
          <span className={`${style.value} ${style.hideValue}`}>
            dlwlehd_official
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>생일</span>
          <span className={`${style.value} ${style.hideValue}`}>
            1999-12-31
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>별명</span>
          <span className={`${style.value} ${style.hideValue}`}>없음</span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>혈액형</span>
          <span className={`${style.value} ${style.hideValue}`}>A</span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>국적</span>
          <span className={`${style.value} ${style.hideValue}`}>대한민국</span>
        </div>
      </div>
    </div>
  );
};

export default WikiProfile;
