import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { getPosts } from "../services/post";

const Posts = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Posts";

    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response);
    };

    fetchPosts();
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>Posts</div>
    </>
  );
};

export default Posts;
