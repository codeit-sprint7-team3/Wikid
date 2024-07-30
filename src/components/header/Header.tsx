import { useState } from 'react';
import style from '@/components/header/Header.module.css';
import Image from 'next/image';
import bell from '@/assets/header/alarmBell.png';
import logo from '@/assets/header/mainLogo.png';
import basicProfile from '@/assets/header/basicUserProfile.png';
import menuImg from '@/assets/header/menuImg.png';
import { useRouter } from 'next/router';
import Modal from '@/components/header/HeaderModal';

const Header = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToLogin = () => {
    router.push('/signup');
  };

  //test
  const user = false;

  return (
    <div className={style.headerContainer}>
      <div className={style.headerNavContainer}>
        <Image
          className={style.logo}
          src={logo}
          alt="logo"
          onClick={navigateToHome}
          title="home"
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
            src={basicProfile}
            alt="유저프로필"
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
          />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Header;
