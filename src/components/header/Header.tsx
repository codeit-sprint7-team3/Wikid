import { useState, useEffect } from 'react';
import style from '@/components/header/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import bell from '@/assets/header/alarmBell.png';
import logo from '@/assets/header/mainLogo.png';
import basicProfile from '@/assets/header/basicUserProfile.png';
import menuImg from '@/assets/header/menuImg.png';
import Modal from '@/components/header/HeaderModal';
import UserModal from '@/components/header/HeaderUserModal';
import authApi from '@/lib/authAxios';
import useAuthStore from '@/store/AuthStore';

const Header = () => {
  const { user, isPending } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user?.profile?.code) {
        try {
          const response = await authApi.get(`/profiles/${user.profile.code}`);
          setUserImg(response.data.image);
        } catch (error) {
          console.error('유저 이미지 불러오기 오류:', error);
          setUserImg(null);
        }
      }
    };
    fetchUserImage();
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  if (isPending) return null;

  return (
    <div className={style.headerContainer}>
      <div className={style.headerNavContainer}>
        <Link href="/">
          <Image
            className={style.logo}
            src={logo}
            alt="logo"
            title="home"
            priority={true}
          />
        </Link>
        <ul className={style.headerNav}>
          <Link href={'/wikilist'}>
            <li>위키목록</li>
          </Link>
          <Link href={'#'}>
            <li>자유게시판</li>
          </Link>
        </ul>
      </div>
      {user ? (
        <div className={style.imgContainer}>
          <Image className={style.bell} src={bell} alt="alarmbell" title="🔔" />
          <Image
            className={style.userProfile}
            src={userImg ? userImg : basicProfile}
            alt="유저프로필"
            onClick={toggleUserModal}
            title="❤️"
            priority={true}
          />
          <UserModal
            isOpen={isUserModalOpen}
            onClose={() => setIsUserModalOpen(false)}
          />
        </div>
      ) : (
        <div>
          <Link href="/login">
            <p className={style.loginText}>로그인</p>
          </Link>
          <Image
            className={style.menuImg}
            src={menuImg}
            alt="menuImg"
            title="menu"
            onClick={toggleModal}
            priority={true}
          />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Header;
