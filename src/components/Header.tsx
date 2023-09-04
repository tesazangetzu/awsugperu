import { Link } from "@reach/router";
import * as React from "react";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Sidebar } from "./Sidebar";
import logo from "../images/logo.png";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <Sidebar menu={menu} setMenu={setMenu} />
      <div className="container-fluid">
        <nav className="flex items-center py-4 h-[60px] overflow-hidden">
          <div className="flex flex-grow">
            <button
              className="w-[24px] text-black"
              onClick={() => setMenu(!menu)}
            >
              <Bars3Icon />
            </button>
          </div>
          <div className="flex flex-grow">
            <Link to="/">
              <img src={logo} alt="logo" width={120} />
            </Link>
          </div>
          <div className="flex flex-grow-0 text-sm">
            <Link to="/">Logout</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
