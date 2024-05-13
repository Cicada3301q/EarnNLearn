import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { removeCookie, setCookie } from "../utils/cookie.util";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const addUser = (user: User) => {
    setUser(user);
    setCookie("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeCookie("user");
  };

  return { user, addUser, removeUser };
};
