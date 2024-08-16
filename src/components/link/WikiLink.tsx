import style from '@/components/link/WikiLink.module.css';
import Image from 'next/image';
import Link from '@/assets/wikilist/icon.svg';

interface WikiLinkProp {
  code: string;
  name: string;
}

const WikiLink = ({ code, name }: WikiLinkProp) => {
  const handleLinkClick = () => {
    const currentUrl = process.env.NEXT_PUBLIC_CURRENT_URL;
    const url = `${currentUrl}/wiki/${code}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('링크가 복사되었습니다!');
      })
      .catch((err) => {
        console.error('링크 복사에 실패했습니다:', err);
      });
  };

  return (
    <div
      className={style.container}
      onClick={handleLinkClick}
      title='
copy?'
    >
      <Image src={Link} alt='Image' className={style.linkIcon} />
      <div>{`https://www.wikied.kr/${name} `}</div>
    </div>
  );
};

export default WikiLink;
