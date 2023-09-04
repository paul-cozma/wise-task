import React, { useState } from "react";
import DeleteIcon from "./icons/Delete";
import SearchIcon from "./icons/Search";

interface Props {
  onResetSearch: () => void;
  onSetSearchKeyword: (keyword: string) => void;
  onSearch: () => void;
}

function SearchBar({ onResetSearch, onSetSearchKeyword, onSearch }: Props) {
  const inputSearchRef = React.createRef<HTMLInputElement>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  const resetSearch = () => {
    setSearchKeyword("");
    inputSearchRef.current?.focus();
    inputSearchRef.current!.value = "";
    onResetSearch();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword(value);
    onSetSearchKeyword(value);
  };

  return (
    <div className="relative max-w-xs w-full">
      <input
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        className="w-full h-9 rounded-md border-solid border-slate-600 my-4 px-2"
        ref={inputSearchRef}
      />
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 ">
        {searchKeyword ? (
          <button onClick={resetSearch}>
            <DeleteIcon />
          </button>
        ) : (
          <SearchIcon />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
