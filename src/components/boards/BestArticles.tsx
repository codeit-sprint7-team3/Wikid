import Image from 'next/image';
import heartIcon from '@/assets/icon/type=heart.svg';
import style from '@/components/boards/BestAricles.module.css';
import { Board } from '@/types/userArticle';

interface BestArticleProps {
  list: Board[];
}

const BestArticles = ({ list }: BestArticleProps) => {
  return (
    <div>
      {list.map((article) => {
        const createdAt = article.createdAt;
        const date = new Date(createdAt);
        const createDate = `${date.getFullYear()}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

        return (
          <div key={article.id} className={style.wrapper}>
            {article.image ? (
              <Image
                className={style.articleImg}
                src={article.image}
                alt='게시글 이미지'
                width={250}
                height={250}
              />
            ) : null}
            <p>{article.title}</p>
            <p>{article.writer.name}</p>
            <p>{createDate}</p>
            <Image src={heartIcon} alt='하트 아이콘' />
            <p>{article.likeCount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BestArticles;
