import React from "react";
import type INavbar from "./INavbar";
import NavConfig from "../../Config/NavConfig";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar: React.FC<INavbar> = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#001233]/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full px-2 items-center">
        <div className="flex min-w-[180px]  items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <i className="bi bi-bag-heart text-lg text-white" />
            </span>

            <div className="leading-tight">
              <p className="text-[15px] font-semibold tracking-wide text-[#edf2fb]">
                {NavConfig.title}
              </p>
              <p className="hidden text-[11px] text-white/70 sm:block">
                Smart deals • Faster shopping
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-2">
          <Link
            to="/YourOrder"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 shadow-sm transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            title="Your orders"
          >
            <i className="bi bi-box-seam text-base text-white/80 transition group-hover:text-white" />
            <span className="hidden sm:inline">Orders</span>
          </Link>

          <Link
            to="/cart"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 shadow-sm transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            title="Cart"
          >
            <i className="bi bi-cart3 text-base text-white/80 transition group-hover:text-white" />
            <span className="hidden sm:inline">Cart</span>

            {/* Optional badge - wire this to your cart count */}
            {/* <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
              3
            </span> */}
          </Link>

          <Link
            to="/profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 shadow-sm transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            title="Profile"
          >
            <i className="bi bi-person text-base" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
