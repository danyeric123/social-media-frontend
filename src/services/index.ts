import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL ?? "http://localhost:8080";

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
  console.log(api.defaults.headers.common);
  delete api.defaults.headers.common["authorization-token"];
};

export const setHeader = (token: string): void => {
  api.defaults.headers.common["authorization-token"] = token;
};
