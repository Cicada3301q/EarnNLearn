import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/auth.util";
import { callApi } from "../../utils/api.util";
import { AuthContext } from "../../context/AuthContextProvider";
import { METHOD } from "../../constants/enums";

const ProtectedRoutes = () => {
  const isAuth = getCookie("jwt");

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await callApi("/api/user", METHOD.GET);
      const data = await response.json();
      const user = data;
      setUser(user);
    };

    if (isAuth) {
      getUser();
    }
  }, []);

  return !!isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
