import style from '@/components/header/HeaderModal.module.css';
import Link from 'next/link';

interface HeaderModal {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderModal = ({ isOpen, onClose }: HeaderModal) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalContainer}>
      <div>
        <Link href="/wikilist" onClick={onClose}>
          위키목록
        </Link>
      </div>
      <div>
        <Link href="/boards" onClick={onClose}>
          자유게시판
        </Link>
      </div>
      <div>
        <Link href="/login" onClick={onClose}>
          로그인
        </Link>
      </div>
    </div>
  );
};

export default HeaderModal;
