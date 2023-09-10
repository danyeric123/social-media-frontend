import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL ?? "http://localhost:8080";

export interface User {
  username: string;
  password: string;
  avatar?: string | File;
  bio?: string;
  following?: User[];
  followers?: User[];
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  const response = await api.post("/login", { username, password });
  api.defaults.headers.common["authorization-token"] = response.data.token;
  return response.data.token;
};

export const logout = (): void => {
  delete api.defaults.headers.common["authorization-token"];
};

export const signup = async (user: User): Promise<string> => {
  const response = await api.post("/users", { ...user });
  api.defaults.headers.common["authorization-token"] = response.data.token;
  return response.data.token;
};

export const setHeader = (token: string): void => {
  api.defaults.headers.common["authorization-token"] = token;
};
