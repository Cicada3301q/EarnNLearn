import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();

  if (isAuth) return <Outlet />;

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
