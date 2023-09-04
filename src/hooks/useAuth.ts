import { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  username: string | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
