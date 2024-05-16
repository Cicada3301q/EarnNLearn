import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { removeCookie, setCookie, getCookie } from "../utils/cookie.util";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // add user to memory and cookie on login
  const addUser = (user: User) => {
    setUser(user);
    setCookie("user", JSON.stringify(user));
  };

  // remove user from memory and cookie on logout
  const removeUser = () => {
    setUser(null);
    removeCookie("user");
  };

  const getUserFromStorage = () => {
    const userCookie = getCookie("user");
    if (userCookie) {
      return JSON.parse(userCookie);
    }
  };

  const isAuth = !!getUserFromStorage();

  return { user, isAuth, addUser, removeUser, getUserFromStorage };
};
