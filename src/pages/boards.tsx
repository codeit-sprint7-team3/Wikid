import BestList from '@/components/boards/BestList';
import Table from '@/components/boards/Table';
import Pagination from 'react-js-pagination';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import style from '@/styles/boards.module.css';
import { Board } from '@/types/userArticle';
import axios from 'axios';
import useAuthStore from '@/store/AuthStore';

interface BestArticlesProps {
  bestList: Board[];
  initialRecentList: Board[];
  initialTotalCount: number;
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
      axios.get('https://wikied-api.vercel.app/6-4/articles', {
        params: bestArticlesParams,
      }),
      axios.get('https://wikied-api.vercel.app/6-4/articles', {
        params: recentArticlesParams,
      }),
    ]);

    const bestList = bestRes.data.list || [];
    const initialRecentList = recentRes.data.list || [];
    const initialTotalCount = recentRes.data.totalCount || 0;

    return {
      props: {
        bestList,
        initialRecentList,
        initialTotalCount,
      },
    };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return {
      props: {
        bestList: [],
        initialRecentList: [],
        initialTotalCount: 0,
      },
    };
  }
};

const Boards = ({
  bestList,
  initialRecentList,
  initialTotalCount,
}: BestArticlesProps) => {
  const { checkAuth } = useAuthStore();
  const [boardsItems, setBoardsItems] = useState(initialRecentList);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');

  const fetchRecentArticles = async () => {
    try {
      const response = await axios.get(
        'https://wikied-api.vercel.app/6-4/articles',
        {
          params: {
            page,
            pageSize,
            orderBy,
            keyword,
          },
        }
      );
      setBoardsItems(response.data.list || []);
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchRecentArticles();
  }, [page, orderBy, keyword]);

  return (
    <div className={style.boardsConatiner}>
      <div className={style.bestContainer}>
        <div className={style.bestHeader}>
          <h1>베스트 게시글</h1>
          <button onClick={() => alert('게시물 등록 페이지로 이동합니다.')}>
            게시물 등록하기
          </button>
        </div>
        <BestList list={bestList} />
      </div>

      <div className={style.navBar}>
        <SearchBar
          placeholder='제목을 검색해 주세요'
          value={keyword}
          onChange={handleSearchChange}
        />
        <select onChange={handleOrderChange} value={orderBy}>
          <option value='recent'>최신순</option>
          <option value='like'>좋아요순</option>
        </select>
      </div>

      <Table items={boardsItems} />

      <Pagination
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass={style.pagination}
        itemClass={style.paginationItem}
        activeClass={style.active}
        linkClass={style.pageLink}
        prevPageText={'<'}
        nextPageText={'>'}
      />
    </div>
  );
};

export default Boards;
