import style from '@/components/header/HeaderUserModal.module.css';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderUserModal = ({ isOpen, onClose }: HeaderModal) => {
  if (!isOpen) return null;
  return (
    <div className={style.userModalContainer}>
      <div className={style.wikiList}>위키 목록</div>
      <div className={style.boards}>자유게시판</div>
      <div>계정 설정</div>
      <div>내 위키</div>
      <div className={style.logout}>로그아웃</div>
    </div>
  );
};

export default HeaderUserModal;
