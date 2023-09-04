import { api } from "./index";

interface PostCreate {
  title: string;
  content: string;
  categories?: string[];
}

export interface Post extends PostCreate {
  ulid: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  likes: string[];
}

interface ReplyCreate {
  content: string;
}

export interface Reply extends ReplyCreate {
  ulid: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  replies: Reply[];
}

export const getPosts = async (): Promise<Post[] | void> => {
  try {
    const response = await api.get("/posts");
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async ({
  title,
  content,
  categories,
}: PostCreate): Promise<Post> => {
  const response = await api.post("/posts", { title, content, categories });
  return response.data;
};

export const likePost = async (id: string): Promise<Post> => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const unlikePost = async (id: string): Promise<Post> => {
  const response = await api.post(`/posts/${id}/unlike`);
  return response.data;
};

export const replyPost = async (
  id: string,
  content: string,
): Promise<Reply> => {
  const response = await api.post(`/posts/${id}/comment`, { content });
  console.log(response.data);
  return response.data;
};
