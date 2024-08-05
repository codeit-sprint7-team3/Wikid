import SearchBar from '@/components/search/SearchBar';
import style from '@/styles/wikilist.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { UserProfile } from '@/types/UserType';
import basicProfile from '@/assets/header/basicUserProfile.png';

const Wikilist = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wikied-api.vercel.app/6-4/profiles',
          {
            params: {
              page: page,
              pageSize: 6,
              name: inputValue || null,
            },
          }
        );
        setTotalCount(response.data.totalCount);
        setSearchResults(response.data.list); // 검색 결과 저장
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [inputValue, page]);
  return (
    <div>
      wikilist
      <SearchBar
        placeholder={'검색어를 입력해주세요'}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue ? (
        <div>{`"${inputValue}"님을 총 ${totalCount}명 찾았습니다`}</div>
      ) : null}
      <div className={style.itemContainer}>
        {searchResults.map((item: UserProfile, index: number) => (
          <div key={index} className={style.wikikItem}>
            <Image
              src={item.image ? item.image : basicProfile}
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
