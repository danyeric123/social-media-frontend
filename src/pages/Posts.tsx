import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { getPosts } from "../services/post";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      <Button variant="primary" onClick={() => navigate("/posts/create")}>
        Create Post
      </Button>
    </>
  );
};

export default Posts;
