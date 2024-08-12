import BestArticles from '@/components/boards/BestArticles';
import Table from '@/components/boards/Table';
import api from '@/lib/basicAxios';
import { GetStaticProps } from 'next';
import { Board } from '@/types/userArticle';

interface BestArticlesProps {
  bestList: Board[];
  recentList: Board[];
}

export const getStaticProps: GetStaticProps<BestArticlesProps> = async () => {
  const bestArticlesParams = {
    page: 1,
    pageSize: 4,
    orderBy: 'like',
  };

  const recentArticlesParams = {
    page: 1,
    pageSize: 10,
    orderBy: 'recent',
  };

  try {
    const [bestRes, recentRes] = await Promise.all([
      api.get('/articles', { params: bestArticlesParams }),
      api.get('/articles', { params: recentArticlesParams }),
    ]);

    const bestList = bestRes.data.list || [];
    const recentList = recentRes.data.list || [];

    return {
      props: {
        bestList,
        recentList,
      },
    };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return {
      props: {
        bestList: [],
        recentList: [],
      },
    };
  }
};

const Boards = ({ bestList, recentList }: BestArticlesProps) => {
  return (
    <>
      <h1>베스트 게시글</h1>
      <BestArticles list={bestList} />
      <h2>최근 게시글 목록</h2>
      <Table items={recentList} />
    </>
  );
};

export default Boards;
