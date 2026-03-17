import React, { useEffect, useRef } from "react";
import type IProductItems from "./IProductItems";
import ProductFilter from "./ProductFilter/ProductFilter";
import useProductAction from "../../Services/Hooks/useProductAction";
import ProductPresentation from "../../PresentationComponent/ProductPresentation/ProductPresentation";

const ProductItems: React.FC<IProductItems> = () => {
  const { productArr, getProducts } = useProductAction();

  const productDiv = useRef<HTMLDivElement>(null);
  const currentPage = useRef<number>(2);
  const isFetching = useRef(false);

  const handleScroll = async () => {
    const el = productDiv.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      if (isFetching.current) return;

      isFetching.current = true;
      try {
        await getProducts(currentPage.current);
        currentPage.current += 1;
      } finally {
        isFetching.current = false;
      }
    }
  };

  useEffect(() => {
    const el = productDiv.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []); // ✅ important

  return (
    <div className="mt-10">
      <ProductFilter />

      <div
        ref={productDiv}
        className="mt-6 h-[100vh] overflow-y-auto px-4"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 m-2">
          {productArr.map((item) => (
            <ProductPresentation
              details={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;