import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLE } from "../../constants/enums";

const ParentRoutes = () => {
  const { getUserFromStorage } = useAuth();
  const user = getUserFromStorage();
  const isParent = user.role === ROLE.PARENT;

  if (isParent) return <Outlet />;

  return <Navigate to={`profile-chores/${user.id}`} />;
};

export default ParentRoutes;
