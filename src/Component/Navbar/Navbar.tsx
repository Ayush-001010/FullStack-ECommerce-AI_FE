import React from "react";
import type INavbar from "./INavbar";
import NavConfig from "../../Config/NavConfig";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar: React.FC<INavbar> = () => {
  return (
    <div className="w-full h-16 bg-[#001233] shadow-sm text-white flex items-center px-4">
      <div className="w-sm">
        <Link
          to="/"
          className="text-lg font-semibold text-shadow-md italic text-[#edf2fb]"
        >
          <p>{NavConfig.title}</p>
        </Link>
      </div>
      <SearchBar />
      <div className="w-lg flex justify-end items-center gap-4">
        <div>
          <p className="flex items-center bg-[#dee2e6] px-2 py-1 rounded-full text-[#212529] font-medium shadow-sm">
            Your Orders
            <span>
              <i className="bi bi-boxes ml-1" />
            </span>
          </p>
        </div>
        <div>
          <p className="flex items-center bg-[#dee2e6] px-2 py-1 rounded-full text-[#212529] font-medium shadow-sm">
            Cart
            <span>
              <i className="bi bi-cart2 ml-1" />
            </span>
          </p>
        </div>
        <div>
          <p className="flex items-center bg-[#dee2e6] px-2 py-1 rounded-full text-[#212529] font-medium shadow-sm">
            <span>
              <i className="bi bi-person" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
