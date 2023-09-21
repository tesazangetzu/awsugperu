import React, { ReactNode } from "react";
import { navigate } from "gatsby";
import localStorageCustom from "../../utils/localStorageCustom";

interface AdminRouteProps {
  children: ReactNode;
  allowGateKeeper?: boolean;
}

const MiddlewareAdminRoute: React.FC<AdminRouteProps> = ({
  children,
  allowGateKeeper,
}) => {
  if (typeof window === "undefined") return;
  const user = localStorageCustom("user");
  const role = localStorageCustom("role");

  if (
    !user ||
    (role !== "ADMIN" && (!allowGateKeeper || role !== "GATE_KEEPER"))
  ) {
    typeof window !== "undefined" ? localStorage.clear() : false;
    navigate("/admin/login");
    return null;
  }

  return <>{children}</>;
};

export default MiddlewareAdminRoute;
