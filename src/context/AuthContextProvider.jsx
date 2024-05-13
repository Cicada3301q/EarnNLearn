import React, { createContext, useEffect, useState } from "react";
import { ROLE } from "../constants/enums";
import { getCookie } from "../utils/cookie.util";

export const AuthContext = createContext({
  user: null,
  setUser: (user) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setUser(user);
    }
  }, [user]);

  const isParent = user?.role === ROLE.PARENT;

  return (
    <AuthContext.Provider value={{ user, setUser, isParent }}>
      {children}
    </AuthContext.Provider>
  );
};
