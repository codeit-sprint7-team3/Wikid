import style from '@/components/search/SearchBar.module.css';
import Image from 'next/image';
import glass from '@/assets/icon/type=search.svg';
interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <div className={style.inputContainer}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={style.searchBar}
      />
      <Image src={glass} alt="Magnifying glass" className={style.glass} />
    </div>
  );
};

export default SearchBar;
