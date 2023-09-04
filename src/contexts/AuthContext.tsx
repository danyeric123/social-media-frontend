// AuthContext.tsx

import React, { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { login as loginApi, logout as logoutApi, setHeader } from "../services/index";
import { setLocalStorage } from "../utils";

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [, setIsAuthenticated] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    const token = await loginApi(username, password);
    setLocalStorage("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutApi();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const tokenValue = token != null && JSON.parse(token);
    console.log(tokenValue.expiry, Date.now())
    if (tokenValue.expiry > Date.now()) {
      setIsAuthenticated(true);
      console.log("tokenValue.value", tokenValue.value)
      setHeader(tokenValue.value);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: checkAuth, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
