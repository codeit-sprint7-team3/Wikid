import { useState, useEffect } from 'react';
import style from '@/components/header/Header.module.css';
import Image from 'next/image';
import bell from '@/assets/header/alarmBell.png';
import logo from '@/assets/header/mainLogo.png';
import basicProfile from '@/assets/header/basicUserProfile.png';
import menuImg from '@/assets/header/menuImg.png';
import { useRouter } from 'next/router';
import Modal from '@/components/header/HeaderModal';
import UserModal from '@/components/header/HeaderUserModal';
import useCheckLogin from '@/hooks/useCheckLogin';
import api from '@/lib/axios';

const Header = () => {
  const { user } = useCheckLogin();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user?.profile.code) {
        try {
          const response = await api.get(`/profiles/${user.profile.code}`);
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

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={style.headerContainer}>
      <div className={style.headerNavContainer}>
        <Image
          className={style.logo}
          src={logo}
          alt="logo"
          onClick={navigateToHome}
          title="home"
          priority={true}
        />
        <ul className={style.headerNav}>
          <li>위키목록</li>
          <li>자유게시판</li>
        </ul>
      </div>
      {user ? (
        <div className={style.imgContainer}>
          <Image className={style.bell} src={bell} alt="alarmbell" />
          <Image
            className={style.userProfile}
            src={userImg ? userImg : basicProfile}
            alt="유저프로필"
            onClick={toggleUserModal}
            priority={true}
          />
          <UserModal
            isOpen={isUserModalOpen}
            onClose={() => setIsUserModalOpen(false)}
          />
        </div>
      ) : (
        <div>
          <p className={style.loginText} onClick={navigateToLogin}>
            로그인
          </p>
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
