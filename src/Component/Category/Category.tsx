import React, { useEffect, useRef } from "react";
import type ICategory from "./ICategory";
import useCategoryAction from "../../Services/Hooks/useCategoryAction";

const Category: React.FC<ICategory> = () => {
  const divCategory = useRef<HTMLDivElement>(null);
  const { categories, getCategories } = useCategoryAction();
  const pageNoRef = useRef(2); // To keep track of the current page number

  const handleScroll = () => {
    const container = divCategory.current;
    if (!container) return;

    const { scrollLeft, clientWidth, scrollWidth } = container;
    const currentViewRight = scrollLeft + clientWidth;

    if (currentViewRight >= scrollWidth - 40) {
      getCategories(pageNoRef.current).finally(() => {
        pageNoRef.current += 1; // Increment the page number for the next fetch
      });
    }
  };

  useEffect(() => {
    const container = divCategory.current;
    if (!container) return;

    // attach
    container.addEventListener("scroll", handleScroll, { passive: true });

    // cleanup
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
    // empty deps: ref doesn't need to be in deps
  }, []);

  return (
    <div
      ref={divCategory}
      className="mt-10 mx-2 flex gap-6 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scroll-smooth"
    >
      {categories.map((category) => (
        <div
          key={Math.random().toString(36).substr(2, 9)} // Generate a unique key for each category
          className="flex min-w-[140px] flex-col items-center snap-start"
        >
          <img
            src={category.ImageURL}
            alt={category.Name}
            className="h-36 w-36 rounded-full object-cover ring-2 ring-gray-200 shadow-lg"
          />
          <p className="mt-3 max-w-[140px] truncate text-sm text-gray-800 font-semibold text-shadow-sm">
            {category.Name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
