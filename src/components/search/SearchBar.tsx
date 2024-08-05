import { useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
