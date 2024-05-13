import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { getUserFromStorage } = useAuth();

  const isAuth = !!getUserFromStorage();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
