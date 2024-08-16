import useAuthStore from '@/store/AuthStore';
import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/basicAxios';
import Image from 'next/image';
import style from '@/components/mypage/Profile.module.css';
import basicUserImg from '@/assets/header/basicUserProfile.png';
import { useRouter } from 'next/router';
import WikiLink from '@/components/link/WikiLink';
import { params } from '@/types/ProfileType';
import Link from 'next/link';

const Profile = () => {
  const { user, checkAuth } = useAuthStore();
  const code = user?.profile?.code;
  const [myProfile, setMyProfile] = useState(params);

  const router = useRouter();

  const getUserProfile = useCallback(async () => {
    try {
      const res = await api.get(`/profiles/${code}`);
      const profile = res.data;
      setMyProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    getUserProfile();
    checkAuth();
  }, [getUserProfile, checkAuth]);

  if (!user) return;
  return (
    <>
      <div className={style.container}>
        <div className={style.profileContainer}>
          <Image
            className={style.profileImg}
            src={
              myProfile.image && myProfile.image !== 'https://example.com/...'
                ? myProfile.image
                : basicUserImg.src
            }
            alt='유저프로필 이미지'
            width={160}
            height={160}
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
        <button className={style.btn}>
          <Link href={`/wiki/${code}`}>내 위키로 이동하기</Link>
        </button>
      </div>
    </>
  );
};

export default Profile;
