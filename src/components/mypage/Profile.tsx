import useAuthStore from '@/store/AuthStore';
import { useEffect, useState } from 'react';
import api from '@/lib/authAxios';
import Image from 'next/image';
import style from '@/components/mypage/Profile.module.css';
import basicUserImg from '@/assets/header/basicUserProfile.png';
import { useRouter } from 'next/router';
import WikiLink from '../link/WikiLink';

const Profile = () => {
  const { user } = useAuthStore();
  const code = user?.profile?.code;
  const [myProfile, setMyProfile] = useState({
    nickname: '',
    birthday: '',
    sns: '',
    job: '',
    mbti: '',
    city: '',
    image: null,
    name: '',
    code: '',
  });
  const router = useRouter();

  const getUserProfile = async () => {
    try {
      const res = await api.get(`/profiles/${code}`);
      const profile = res.data;
      setMyProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleOnClick = () => {
    router.push('/');
  };

  if (!user) return;
  return (
    <>
      <div className={style.container}>
        <div className={style.profileContainer}>
          <Image
            className={style.profileImg}
            src={myProfile.image ? myProfile.image : basicUserImg}
            alt='유저프로필 이미지'
          />
          <p className={style.profileName}>{user.name}</p>
          <WikiLink name={user.name} code={myProfile.code} />
          <div className={style.profileDetails}>
            <div className={style.profileSecstion}>
              <p className={style.profileLabel}>SNS</p>
              {myProfile.sns ? (
                <p className={style.profileText}>{myProfile.sns}</p>
              ) : (
                <p className={style.profileEmptyText}>정보가 없습니다</p>
              )}
            </div>
            <div className={style.profileSecstion}>
              <p className={style.profileLabel}>생일</p>
              {myProfile.birthday ? (
                <p className={style.profileText}>{myProfile.birthday}</p>
              ) : (
                <p className={style.profileEmptyText}>정보가 없습니다</p>
              )}
            </div>
            <div className={style.profileSecstion}>
              <p className={style.profileLabel}>MBTI</p>
              {myProfile.mbti ? (
                <p className={style.profileText}>{myProfile.mbti}</p>
              ) : (
                <p className={style.profileEmptyText}>정보가 없습니다</p>
              )}
            </div>
            <div className={style.profileSecstion}>
              <p className={style.profileLabel}>거주 도시</p>
              {myProfile.city ? (
                <p className={style.profileText}>{myProfile.city}</p>
              ) : (
                <p className={style.profileEmptyText}>정보가 없습니다</p>
              )}
            </div>
            <div className={style.profileSecstion}>
              <p className={style.profileLabel}>직업</p>
              {myProfile.job ? (
                <p className={style.profileText}>{myProfile.job}</p>
              ) : (
                <p className={style.profileEmptyText}>정보가 없습니다</p>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleOnClick} className={style.btn}>
          내 위키로 이동하기
        </button>
      </div>
    </>
  );
};

export default Profile;
