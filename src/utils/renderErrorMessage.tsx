import * as React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const renderErrorMessage = (message: string) => {
  return (
    <p className="ff-cg--semibold text-red-500 text-[14px] mt-2 flex items-center">
      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
      {message}
    </p>
  );
};
