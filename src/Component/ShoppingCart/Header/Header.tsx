import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = () => {
  return (
    <div className="hidden md:grid grid-cols-12 gap-4 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
      <div className="col-span-7 flex items-center gap-2">
        <i className="bi bi-box-seam text-slate-400" />
        Product
      </div>
      <div className="col-span-3 flex items-center gap-2">
        <i className="bi bi-plus-slash-minus text-slate-400" />
        Quantity
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <i className="bi bi-currency-rupee text-slate-400" />
        Price
      </div>
    </div>
  );
};

export default Header;