import { api } from "./index";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const followUser = async (username: string) => {
  const response = await api.post(`/follow/${username}`);
  return response.data;
};

export const unfollowUser = async (username: string) => {
  const response = await api.post(`/unfollow/${username}`);
  return response.data;
};
