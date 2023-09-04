import { Link } from "gatsby";
import * as React from "react";
import logoWhite from "../images/logo-white.png";

export const Banner = () => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-header-custom h-[60px]"
      style={{ backgroundPosition: "center 70%" }}
    >
      <div className="container h-full flex items-center">
        <img src={logoWhite} alt="logo" className="w-[150px]" />
      </div>
    </section>
  );
};
