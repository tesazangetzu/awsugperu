import * as React from "react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type IRenderMessage = {
  message?: string;
  error?: boolean;
};

export const RenderMessage = ({ message = "", error }: IRenderMessage) => {
  return (
    <>
      {message !== "" ? (
        <p
          className={`flex items-center justify-center ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {error ? (
            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
          ) : (
            <CheckIcon className="w-4 h-4 mr-1" />
          )}
          {message}
        </p>
      ) : (
        ""
      )}
    </>
  );
};
