import { Link } from "gatsby";
import * as React from "react";

interface IButton {
  text: string;
  to?: string | null;
  level?: "first" | "second" | "third";
}

const levels = {
  first: "hover:bg-black hover:text-white",
  second: "bg-red-500 text-white hover:bg-black hover:text-white",
  third: "bg-black text-white hover:bg-white hover:text-black",
};

export const Button = ({ text, to = null, level = "first" }: IButton) => {
  const className = `flex justify-center p-3 m-2 border rounded-md w-36 text-center ${levels[level]}`;
  return (
    <>
      {to ? (
        <Link className={className} to={to}>
          {text}
        </Link>
      ) : (
        <button className={className}>{text}</button>
      )}
    </>
  );
};
