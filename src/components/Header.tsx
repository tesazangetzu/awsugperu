import { Link } from "@reach/router";
import * as React from "react";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logoWhite from "../images/logo-white.png";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <header
      className="bg-no-repeat bg-cover bg-header-custom h-[80px]"
      style={{ backgroundPosition: "center 70%" }}
    >
      <div
        className={`${
          menu ? "block" : "hidden"
        } absolute top-0 h-full bg-white w-[230px] py-3`}
      >
        <div className="container">
          <button
            className="text-black flex ml-auto"
            onClick={() => setMenu(!menu)}
          >
            <XMarkIcon width={28} />
          </button>
          <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:block [&>li>a]:w-full text-orange-900">
            <li>
              <Link to="/" className="hover:bg-orange-200">
                Dashboad
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:bg-orange-200">
                Rewards
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-fluid">
        <nav className="flex items-center py-4">
          <div className="flex flex-grow">
            <button
              className="w-[28px] text-white"
              onClick={() => setMenu(!menu)}
            >
              <Bars3Icon />
            </button>
          </div>
          <div className="flex flex-grow">
            <Link to="/">
              <img src={logoWhite} alt="logo" className="w-[150px]" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
