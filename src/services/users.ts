import { api } from "./index";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const createUser = async (username: string, password: string) => {
  const response = await api.post("/users", { username, password });
  return response.data;
};
