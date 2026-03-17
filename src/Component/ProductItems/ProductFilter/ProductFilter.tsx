import React from "react";
import type IProductFilter from "./IProductFilter";
import { Button, Select } from "antd";

const ProductFilter: React.FC<IProductFilter> = () => {
  return (
    <div>
    <div className="mx-5 mt-6 flex items-center">
      <div className=" flex items-center gap-3 overflow-x-auto pb-2">
        <Button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]">
          <i className="bi bi-suit-heart text-base text-rose-500" />
          Favorite
        </Button>

        <Button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]">
          New Arrivals
        </Button>

        <Button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]">
          Best Seller
        </Button>

        <Button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]">
          Discount
        </Button>
      </div>
      <div className="mx-10 flex items-center gap-3 pb-2">
        <Select className="rounded-full " options={[{label:"All",value:"All"}]} value={"All"}/>
      </div>
      
    </div>
    <hr className="mx-5 mt-4 border-gray-200" />
    </div>
  );
};

export default ProductFilter;
