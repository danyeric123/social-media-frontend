import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/Post/PostCard";
import { useAuth } from "../hooks/useAuth";
import { Post } from "../services/post";
import { getPosts } from "../services/post";

const Posts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Posts";

    const fetchPosts = async () => {
      const response = await getPosts();
      return response;
    };

    fetchPosts().then((response) => {
      if (response) {
        setPosts(response);
        setLoading(false);
      }
    });
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1>Recent Posts</h1>
      <hr className="divider" />
      <Container fluid="md">
        {posts.map((post) => (
          <PostCard post={post} key={post.ulid} />
        ))}
      </Container>
      <hr className="divider" />
      <Button variant="primary" onClick={() => navigate("/posts/create")}>
        Create Post
      </Button>
    </>
  );
};

export default Posts;
