import style from '@/components/header/HeaderUserModal.module.css';
import Link from 'next/link';
import useAuthStore from '@/store/AuthStore';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderUserModal = ({ isOpen, onClose }: HeaderModal) => {
  const { signOut, user } = useAuthStore();

  const handleSignOutClick = () => {
    signOut();
  };

  if (!isOpen) return null;
  if (!user) return null;

  return (
    <div className={style.userModalContainer}>
      <Link href='/wikilist' onClick={onClose}>
        <div className={style.wikiList}>위키 목록</div>
      </Link>
      <Link href='/boards' onClick={onClose}>
        <div className={style.boards}>자유게시판</div>
      </Link>
      <Link href='/mypage' onClick={onClose}>
        <div className={style.accSettings}>계정 설정</div>
      </Link>
      <Link href={`/wiki/${user.profile.code}`} onClick={onClose}>
        <div className={style.myWiki}>내 위키</div>
      </Link>
      <div className={style.logout} onClick={handleSignOutClick}>
        로그아웃
      </div>
    </div>
  );
};

export default HeaderUserModal;
