import { ArrowLeftOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";
import * as React from "react";

interface SidebarProps {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ menu, setMenu }) => {
  return (
    <div
      className={`${
        menu ? "block" : "hidden"
      } absolute top-0 h-full bg-white w-[230px] py-3`}
    >
      <div className="container relative h-full">
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
        <ul className="absolute bottom-0 py-3">
          <li className="p-2">
            <Link to="" className="flex p-2 text-black w-32">
              <ArrowLeftOnRectangleIcon width={28} className="mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
