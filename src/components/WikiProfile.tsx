import NullUser from '@/assets/header/basicUserProfile.png';
import Image from 'next/image';
import style from '@/styles/wikiprofile.module.css';
import { Profile } from '@/types/UserType';

const WikiProfile = ({ profile }: { profile: Profile }) => {
  return (
    <div className={style.wrapper}>
      <Image
        src={profile?.image || NullUser}
        alt='프로필 이미지'
        className={style.wikiProfileImg}
        priority={true}
      />
      <div className={style.profileDetails}>
        <div className={style.profileItem}>
          <span className={style.label}>거주 도시</span>
          <span className={style.value}>{profile.city}</span>
        </div>
        <div className={style.profileItem}>
          <span className={style.label}>MBTI</span>
          <span className={style.value}>{profile.mbti}</span>
        </div>
        <div className={style.profileItem}>
          <span className={style.label}>직업</span>
          <span className={style.value}>{profile.job}</span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>SNS 계정</span>
          <span className={`${style.value} ${style.hideValue}`}>
            {profile.sns}
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>생일</span>
          <span className={`${style.value} ${style.hideValue}`}>
            {profile.birthday}
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>별명</span>
          <span className={`${style.value} ${style.hideValue}`}>
            {profile.nickname}
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>혈액형</span>
          <span className={`${style.value} ${style.hideValue}`}>
            {profile.bloodType}
          </span>
        </div>
        <div className={style.profileItem}>
          <span className={`${style.label} ${style.hideLabel}`}>국적</span>
          <span className={`${style.value} ${style.hideValue}`}>
            {profile.nationality}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WikiProfile;
