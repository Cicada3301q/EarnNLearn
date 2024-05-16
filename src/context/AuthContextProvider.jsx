import React, { createContext, useEffect, useState } from "react";
import { ROLE } from "../constants/enums";
import { getCookie } from "../utils/cookie.util";

export const AuthContext = createContext({
  user: null,
  setUser: (user) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // add user object to applications memory on reload
  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
