import React, { useEffect, useState } from "react";
import type ISearchBar from "./ISearchBar";
import { Button, Input } from "antd";
import useUserProductAction from "../../../Services/Hooks/useUserProductAction";
import type AutoSuggestionDataInterface from "../../../Interface/AutoSuggestion";
import Suggestion from "./Suggestion/Suggestion";

const SearchBar: React.FC<ISearchBar> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { searchProducts } = useUserProductAction();
  const [searchResults, setSearchResults] = useState<Array<AutoSuggestionDataInterface>>([]);
  const divRef = React.useRef<HTMLDivElement>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const obj = setTimeout( async () => {
        console.log(searchText);
        if(searchText.trim() === "") return;
        const response = await searchProducts(searchText);
        setSearchResults(response);
    }, 100);
    return () => {
      clearTimeout(obj);
    };
  }, [searchText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-center" ref={divRef}>
      {/* add relative + max width container */}
      <div className="relative w-full max-w-xl">
        <div className="flex w-full items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <Input
            className="h-10 !border-0 !shadow-none !rounded-none !text-[#6c757d] font-medium"
            placeholder="Search Anything..."
            allowClear
            value={searchText}
            onChange={changeHandler}
          />
          <Button className="!h-10 !rounded-none !border-none !bg-[#dbb42c] px-4" type="primary">
            <i className="bi bi-search text-lg font-semibold text-[#212529]" />
          </Button>
        </div>
  
        {/* make suggestions dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-80 overflow-auto">
              {searchResults.map((item) => (
                <Suggestion key={item.id} data={item} />
              ))}
            </div>
          </div>
        )}
        {searchResults.length === 0 && searchText.trim() !== "" && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchText}"
            </div>
          </div>
        )}  
      </div>
    </div>
  );
};

export default SearchBar;
