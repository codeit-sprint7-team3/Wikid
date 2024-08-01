import style from '@/components/header/HeaderModal.module.css';
import { useRouter } from 'next/router';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderModal = ({ isOpen, onClose }: HeaderModal) => {
  const router = useRouter();
  const navigateTowikilist = () => {
    router.push('/wikilist');
  };
  const navigateToboards = () => {
    router.push('/boards');
  };
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <ul className={style.modalUl}>
          <li onClick={navigateTowikilist}>위키목록</li>
          <li onClick={navigateToboards}>자유게시판</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderModal;
