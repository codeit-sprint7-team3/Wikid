import SearchBar from '@/components/search/SearchBar';
import style from '@/styles/wikilist.module.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { UserProfile } from '@/types/UserType';
import basicProfile from '@/assets/header/basicUserProfile.png';
import { debounce } from 'lodash';
import noSearch from '@/assets/wikilist/teong.png';
import WikiLink from '@/components/link/WikiLink';
import useAuthStore from '@/store/AuthStore';
import Header from '@/components/header/Header';

const Wikilist = () => {
  const [inputValue, setInputValue] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const { checkAuth, isPending } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchData = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://wikied-api.vercel.app/6-4/profiles',
          {
            params: {
              page: page,
              pageSize: 8,
              name: searchTerm || null,
            },
          }
        );
        setTotalCount(response.data.totalCount);
        setSearchResults(response.data.list);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  const debouncedFetchData = useCallback(
    debounce((searchTerm: string) => fetchData(searchTerm), 1300),
    [fetchData]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData(inputValue);
    } else {
      debouncedFetchData(inputValue);
    }
  }, [inputValue, fetchData, debouncedFetchData]);

  if (isPending) {
    return null;
  }

  return (
    <>
      <Header />
      <div className={style.listPageConatainer}>
        <SearchBar
          placeholder={'검색어를 입력해주세요'}
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <div>
            {isLoading ? (
              <div
                className={style.foundUserText}
              >{`"${inputValue}" 님을 찾아볼게요!! 잠시만요!`}</div>
            ) : totalCount === 0 ? (
              <div className={style.notFoundUserContainer}>
                <div className={style.notFoundText}>
                  {`"${inputValue}" 님은 아무래도 없는것 같아요 ㅠㅠ`}
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
        <div className={style.itemContainer}>
          {searchResults.map((item: UserProfile, index: number) => (
            <div key={index} className={style.wikikItem}>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Wikilist;
