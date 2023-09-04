import { api } from "./index";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (title: string, content: string) => {
  const response = await api.post("/posts", { title, content });
  return response.data;
};
