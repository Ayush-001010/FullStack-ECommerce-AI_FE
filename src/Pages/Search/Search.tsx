import React from "react";
import type ISearch from "./ISearch";
import useSearchAction from "../../Services/Hooks/useSearchAction";
import ProductPresentation from "../../PresentationComponent/ProductPresentation/ProductPresentation";
import type ProductInterface from "../../Interface/ProductInterface";

const Search: React.FC<ISearch> = () => {
  const { data } = useSearchAction();
  console.log("Search data in component:", data);

  return (
    <div>
      { (data || []).map((item : ProductInterface) => <ProductPresentation key={item.id} details={item} />) }
    </div>
  );
};

export default Search;
