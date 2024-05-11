import React, { createContext, useState } from "react";
import { ROLE } from "../constants/enums";

export const AuthContext = createContext({
  user: null,
  isParent: null,
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isParent = user?.role === ROLE.PARENT;

  return (
    <AuthContext.Provider value={{ user, setUser, isParent }}>
      {children}
    </AuthContext.Provider>
  );
};
