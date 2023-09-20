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
  const user = localStorageCustom("user");
  const role = localStorageCustom("role");

  if (
    !user &&
    role !== "ADMIN" &&
    (!allowGateKeeper || role !== "GATE_KEEPER")
  ) {
    navigate("/admin/login");
    return null;
  }

  return <>{children}</>;
};

export default MiddlewareAdminRoute;
