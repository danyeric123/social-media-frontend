import { api, User } from "./index";

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

export const editUser = async (
  oldUsername: string,
  { username, password, avatar }: User,
) => {
  const response = await api.put(`/users/${oldUsername}`, {
    username,
    password,
    avatar,
  });
  return response.data;
};
