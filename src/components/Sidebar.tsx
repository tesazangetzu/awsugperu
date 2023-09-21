import {
  ArrowLeftOnRectangleIcon,
  CubeIcon,
  GiftIcon,
  HomeIcon,
  LockClosedIcon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, navigate } from "gatsby";
import * as React from "react";
import localStorageCustom from "../utils/localStorageCustom";

interface SidebarProps {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const linkStyle = "flex justify-start items-center hover:bg-orange-200";

export const Sidebar: React.FC<SidebarProps> = ({ menu, setMenu }) => {
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const admin = (
    <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:w-full text-orange-900">
      <li>
        <Link to="/admin/scan" className={linkStyle}>
          <CubeIcon width={20} className="mr-2" />
          Panel
        </Link>
      </li>
      <li>
        <Link to="/admin/attendee" className={linkStyle}>
          <UsersIcon width={20} className="mr-2" />
          Asistentes
        </Link>
      </li>
      <li>
        <Link to="/admin/list-gate-keeper" className={linkStyle}>
          <UserIcon width={20} className="mr-2" />
          Voluntarios
        </Link>
      </li>
      <li>
        <Link to="/admin/award" className={linkStyle}>
          <GiftIcon width={20} className="mr-2" />
          Premiación
        </Link>
      </li>
    </ul>
  );

  const profile = (
    <li>
      <Link
        to={`/attendee/${localStorageCustom("attendee")}`}
        className={linkStyle}
      >
        <UserCircleIcon width={20} className="mr-2" />
        Perfil
      </Link>
    </li>
  );

  const reward = (
    <li>
      <Link to={"/attendee/reward"} className={linkStyle}>
        <StarIcon width={20} className="mr-2" />
        Premios
      </Link>
    </li>
  );

  const defaultLinks = (
    <>
      <li>
        <Link to="/attendee/welcome" className={linkStyle}>
          <UserIcon width={20} className="mr-2" />
          Asistente
        </Link>
      </li>
      <li>
        <Link to="/admin/login" className={linkStyle}>
          <LockClosedIcon width={20} className="mr-2" />
          Admin
        </Link>
      </li>
    </>
  );

  const attendee = (
    <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:w-full text-orange-900">
      <li>
        <Link to="/" className={linkStyle}>
          <HomeIcon width={20} className="mr-2" />
          Inicio
        </Link>
      </li>
      {localStorageCustom("attendee") ? profile : ""}
      {localStorageCustom("attendee") || localStorageCustom("code")
        ? reward
        : ""}
      {!localStorageCustom("code") ? defaultLinks : ""}
    </ul>
  );

  const gateKeeper = (
    <ul className="py-3 [&>li]:p-2 [&>li>a]:p-2 [&>li>a]:w-full text-orange-900">
      <li>
        <Link to="/admin/scan" className={linkStyle}>
          <CubeIcon width={20} className="mr-2" />
          Panel
        </Link>
      </li>
      <li>
        <Link to="/admin/attendee" className={linkStyle}>
          <UsersIcon width={20} className="mr-2" />
          Asistentes
        </Link>
      </li>
    </ul>
  );

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

        {localStorageCustom("role") === "ADMIN" ? admin : ""}

        {localStorageCustom("role") === "GATE_KEEPER" ? gateKeeper : ""}

        {!localStorageCustom("role") ? attendee : ""}

        {localStorageCustom("user") ? (
          <ul className="absolute bottom-0 py-3">
            <li className="p-2">
              <button
                className="flex p-2 text-black items-center"
                onClick={() => handleLogout()}
              >
                <ArrowLeftOnRectangleIcon width={28} className="mr-3" />
                Cerrar sesion
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
