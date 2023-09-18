import { Link } from "gatsby";
import * as React from "react";

interface IButton {
  text: string;
  to?: string | null;
  level?: "first" | "second" | "third" | "fourth";
  children?: any;
}

const levels = {
  first: "hover:bg-black hover:text-white",
  second: "bg-red-500 text-white hover:bg-black hover:text-white",
  third:
    "bg-black border-black text-white hover:bg-white hover:border-white hover:text-black",
  fourth:
    "hover:bg-black hover:border-black hover:text-white bg-white border-white text-black",
};

export const Button = ({
  text,
  to = null,
  level = "first",
  children,
}: IButton) => {
  const className = `flex justify-center items-center p-3 m-2 border rounded-md min-w-[144px] text-center ${levels[level]}`;
  return (
    <>
      {to ? (
        <Link className={className} to={to}>
          {children}
          {text}
        </Link>
      ) : (
        <button className={className}>
          {children}
          {text}
        </button>
      )}
    </>
  );
};
