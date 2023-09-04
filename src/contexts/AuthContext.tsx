// AuthContext.tsx

import React, { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import {
  login as loginApi,
  logout as logoutApi,
  setHeader,
} from "../services/index";
import { setLocalStorage } from "../utils";

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const login = async (username: string, password: string) => {
    const token = await loginApi(username, password);
    setLocalStorage("token", token);
    setUsername(username);
    setLocalStorage("username", username);
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
    const usernameStorage = localStorage.getItem("username");
    const username = usernameStorage != null && JSON.parse(usernameStorage);
    if (
      tokenValue.expiry > Date.now() &&
      username.value !== null &&
      username.value !== undefined
    ) {
      setIsAuthenticated(true);
      setHeader(tokenValue.value);
      setUsername(username.value);
      return true;
    } else {
      setIsAuthenticated(false);
      setHeader("");
      setUsername(undefined);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: checkAuth, login, logout, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};
