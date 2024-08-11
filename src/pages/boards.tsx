import useAuthStore from '@/store/AuthStore';
import { useEffect, useState } from 'react';
import style from '@/styles/boards.module.css';
import SearchBar from '@/components/search/SearchBar';
import axios from 'axios';
import Table from '@/components/table/Table';
import Pagination from 'react-js-pagination';
import Image from 'next/image';
import { Board } from '@/types/userArticle';

const Boards = () => {
  const { checkAuth } = useAuthStore();
  const [boardsItems, setBoardsItems] = useState<Board[]>([]);
  const [bestPosts, setBestPosts] = useState<Board[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');

  const patchData = async () => {
    const result = await axios.get(
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
    setBoardsItems(result.data.list);
    setTotalCount(result.data.totalCount);
  };
  const fetchBestPosts = async () => {
    const result = await axios.get(
      'https://wikied-api.vercel.app/6-4/articles',
      {
        params: {
          page: 1,
          pageSize: 4,
          orderBy: 'like',
        },
      }
    );
    setBestPosts(result.data.list);
  };

  useEffect(() => {
    const getData = async () => {
      await patchData();
      await fetchBestPosts();
    };
    getData();
  }, [page, orderBy, keyword]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <div>
        <div>베스트 게시글</div>
        <div className={style.bestPostsGrid}>
          {bestPosts.map((post) => (
            <div key={post.id} className={style.bestPostCard}>
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  className={style.bestPostImage}
                  width={100}
                  height={100}
                />
              ) : null}

              <div className={style.bestPostTitle}>{post.title}</div>
              <div>{post.writer.name}</div>
              <div>{new Date(post.createdAt).toLocaleDateString()}</div>
              <div>❤️ {post.likeCount}</div>
            </div>
          ))}
        </div>
        <button>게시물 등록하기</button>
      </div>

      <div>
        <SearchBar
          placeholder='제목을 검색해 주세요'
          value={keyword}
          onChange={handleSearchChange}
        />
        <select name='' id='' onChange={handleOrderChange}>
          <option value='recent'>최신순</option>
          <option value='like'>좋아요순</option>
        </select>
      </div>

      <Table items={boardsItems} />

      <Pagination
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5} // 한 번에 표시할 페이지 수
        onChange={handlePageChange}
        innerClass={style.pagination} // 페이지네이션의 스타일을 위한 클래스
        itemClass={style.paginationItem} // 각 페이지 아이템의 스타일 클래스
        activeClass={style.active} // 현재 활성화된 페이지의 스타일 클래스
        linkClass={style.pageLink} // 페이지 링크 스타일 클래스
        prevPageText={'<'} // 이전 페이지 텍스트
        nextPageText={'>'} // 다음 페이지 텍스트
      />
    </div>
  );
};

export default Boards;
