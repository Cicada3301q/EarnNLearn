import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/auth.util";

const ProtectedRoutes = () => {
  const isAuth = getCookie("jwt");

  return !!isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
