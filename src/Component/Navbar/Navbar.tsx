import React from "react";
import type INavbar from "./INavbar";
import NavConfig from "../../Config/NavConfig";
import { Link } from "react-router-dom";
import { Button, Input, Select } from "antd";

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
      <div className="flex items-center w-xl shadow-sm">
        <Select
          className="!rounded-none !bg-[#dee2e6] w-20 h-10 !text-[#212529]"
          options={[{ label: "All", value: "All" }]}
          value={"All"}
        />
        <Input
          className="!rounded-none h-10 !text-[#6c757d] font-medium"
          placeholder="Search Anything..."
        />
        <Button className="!rounded-none !h-10 !bg-[#dbb42c] !border-none">
          <p>
            <span>
              <i className="bi bi-search text-lg font-semibold text-[#212529]" />
            </span>
          </p>
        </Button>
      </div>
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
