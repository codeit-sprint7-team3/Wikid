import { useEffect } from 'react';
import style from '@/components/header/HeaderModal.module.css';
import { useRouter } from 'next/router';
import { User } from '@/types/UserType';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const HeaderModal = ({ isOpen, onClose, user }: HeaderModal) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, onClose]);

  const navigateTowikilist = () => {
    router.push('/wikilist');
  };
  const navigateToboards = () => {
    router.push('/boards');
  };
  const navigateToLogin = () => {
    router.push('/login');
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <ul className={style.modalUl}>
          <li onClick={navigateTowikilist}>위키목록</li>
          <li onClick={navigateToboards}>자유게시판</li>
          <li onClick={navigateToLogin}>로그인</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderModal;
