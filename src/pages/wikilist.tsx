import SearchBar from '@/components/search/SearchBar';
import style from '@/styles/wikilist.module.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { UserProfile } from '@/types/UserType';
import basicProfile from '@/assets/header/basicUserProfile.png';
import { debounce } from 'lodash';

const Wikilist = () => {
  const [inputValue, setInputValue] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const fetchData = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://wikied-api.vercel.app/6-4/profiles',
          {
            params: {
              page: page,
              pageSize: 6,
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
    debounce((searchTerm: string) => fetchData(searchTerm), 1000),
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

  return (
    <div>
      <h1>Wikilist</h1>
      <SearchBar
        placeholder={'검색어를 입력해주세요'}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <div>
          {isLoading
            ? `"${inputValue}"님을 찾고 있습니다...`
            : `"${inputValue}"님을 총 ${totalCount}명 찾았습니다`}
        </div>
      )}
      <div className={style.itemContainer}>
        {searchResults.map((item: UserProfile, index: number) => (
          <div key={index} className={style.wikikItem}>
            <Image
              src={item.image || basicProfile}
              alt="프로필사진"
              width={50}
              height={50}
            />
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wikilist;
