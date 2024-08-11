import SearchBar from '@/components/search/SearchBar';
import style from '@/styles/wikilist.module.css';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { UserProfile } from '@/types/UserType';
import basicProfile from '@/assets/header/basicUserProfile.png';
import { debounce } from 'lodash';
import noSearch from '@/assets/wikilist/teong.png';
import Link from 'next/link';
import useAuthStore from '@/store/AuthStore';
import basicApi from '@/lib/basicAxios';
import InfiniteScroll from 'react-infinite-scroll-component';
import top from '@/assets/wikilist/top.png';
import WikiLink from '@/components/link/WikiLink';

const Wikilist = () => {
  const [inputValue, setInputValue] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchData = useCallback(async (searchTerm: string, page: number) => {
    setIsLoading(true);
    try {
      const response = await basicApi.get(`/profiles`, {
        params: {
          page: page,
          pageSize: 10,
          name: searchTerm || null,
        },
      });

      if (page === 1) {
        setSearchResults(response.data.list);
      } else {
        setSearchResults((prevResults) => [
          ...prevResults,
          ...response.data.list,
        ]);
      }

      setTotalCount(response.data.totalCount);
      setHasMore(response.data.list.length > 0);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchData = useCallback(
    debounce((searchTerm: string) => {
      setPage(1);
      fetchData(searchTerm, 1);
    }, 1000),
    [fetchData]
  );

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(inputValue, nextPage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    debouncedFetchData(inputValue);
  }, [inputValue, debouncedFetchData]);

  const handleGotoTopBtn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={style.listPageConatainer}>
      <SearchBar
        placeholder={'검색어를 입력해주세요'}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <div>
          {isLoading ? (
            <div className={style.foundUserText}>
              {`"${inputValue}" 님을 찾아볼게요!! 잠시만요!`}
            </div>
          ) : totalCount === 0 ? (
            <div className={style.notFoundUserContainer}>
              <div className={style.notFoundText}>
                {`"${inputValue}" 님은 아무래도 없는 것 같아요 ㅠㅠ`}
              </div>
              <Image src={noSearch} alt="no-search" />
            </div>
          ) : (
            <div className={style.foundUserTextContainer}>
              <div
                className={style.foundUserText2}
              >{`"${inputValue}"님을 총 `}</div>
              <div className={style.totalCountText2}> {totalCount}</div>
              <div className={style.foundUserText2}> 명 찾았답니당</div>
            </div>
          )}
        </div>
      )}
      <InfiniteScroll
        dataLength={searchResults.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div></div>}
        endMessage={<div className={style.endMessage}></div>}
        scrollThreshold={0.9}
      >
        <div className={style.itemContainer}>
          {searchResults.map((item: UserProfile, index: number) => (
            <Link key={index} href={`/wiki/${item.code}`}>
              <div className={style.wikikItem}>
                <div className={style.imgAndName}>
                  <Image
                    src={item.image || basicProfile}
                    alt="프로필사진"
                    width={50}
                    height={50}
                    className={style.userProfile}
                  />
                  <div className={style.hoverContainer}>
                    <div className={style.userName}>{item.name}</div>
                    <div className={style.hoverItem}>
                      <div>{item.nationality ? item.nationality : null}</div>
                      <div>{item.city ? item.city : null}</div>
                      <div>{item.job ? item.job : null}</div>
                    </div>
                  </div>
                </div>
                <WikiLink code={item.code} name={item.name} />
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
      <Image
        src={top}
        alt="goTop"
        onClick={handleGotoTopBtn}
        className={style.goToTop}
        title="Top"
      />
    </div>
  );
};

export default Wikilist;
