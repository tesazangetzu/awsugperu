import React, { ReactNode } from "react";
import { navigate } from "gatsby";
import localStorageCustom from "../utils/localStorageCustom";

interface AdminRouteProps {
  children: ReactNode;
}

const MiddlewareAdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = localStorageCustom("user");
  const role = localStorageCustom("role");
  console.log(!user && role !== "ADMIN");
  if (!user && role !== "ADMIN") {
    navigate("/admin/login");
    return null;
  }

  return <>{children}</>;
};

export default MiddlewareAdminRoute;
