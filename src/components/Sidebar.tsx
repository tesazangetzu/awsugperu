import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  LockClosedIcon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, navigate } from "gatsby";
import * as React from "react";
import localStorageCustom from "../utils/localStorageCustom";

interface SidebarProps {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ menu, setMenu }) => {
  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div
      className={`${
        menu ? "block" : "hidden"
      } absolute top-0 h-full bg-white w-[230px] py-3 z-10`}
    >
      <div className="container relative h-full">
        <button
          className="text-black flex ml-auto"
          onClick={() => setMenu(!menu)}
        >
          <XMarkIcon width={28} />
        </button>
        {localStorageCustom("role") &&
        localStorage.getItem("role") === "gate_keeper" ? (
          <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:block [&>li>a]:w-full text-orange-900">
            <li>
              <Link to="/admin/scan" className="hover:bg-orange-200">
                Dashboad
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:w-full text-orange-900">
            <li>
              <Link
                to="/"
                className="hover:bg-orange-200 flex justify-start items-center"
              >
                <HomeIcon width={20} className="mr-2" />
                Inicio
              </Link>
            </li>
            {localStorageCustom("attendee") ? (
              <li>
                <Link
                  to={`/attendee/${localStorage.getItem("attendee")}`}
                  className="hover:bg-orange-200 flex justify-start"
                >
                  <UserCircleIcon width={20} className="mr-2" />
                  Profile
                </Link>
              </li>
            ) : (
              ""
            )}

            {localStorageCustom("attendee") || localStorageCustom("code") ? (
              <li>
                <Link
                  to={"/attendee/reward"}
                  className="hover:bg-orange-200 flex justify-start"
                >
                  <StarIcon width={20} className="mr-2" />
                  Reward
                </Link>
              </li>
            ) : (
              ""
            )}

            {!localStorageCustom("code") ? (
              <>
                <li>
                  <Link
                    to="/attendee/welcome"
                    className="hover:bg-orange-200 flex justify-start"
                  >
                    <UserIcon width={20} className="mr-2" />
                    Usuario
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:bg-orange-200 flex justify-start"
                  >
                    <LockClosedIcon width={20} className="mr-2" />
                    Admin
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        )}

        {localStorageCustom("user") ? (
          <ul className="absolute bottom-0 py-3">
            <li className="p-2">
              <button
                className="flex p-2 text-black w-32"
                onClick={() => handleLogout()}
              >
                <ArrowLeftOnRectangleIcon width={28} className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
