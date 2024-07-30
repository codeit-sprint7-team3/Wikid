import style from '@/components/header/HeaderModal.module.css';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderModal = ({ isOpen, onClose }: HeaderModal) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <ul className={style.modalUl}>
          <li>위키목록</li>
          <li>자유게시판</li>
          <li>알림</li>
          <li>마이페이지</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderModal;
