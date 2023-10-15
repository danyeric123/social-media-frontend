import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PostCard from "../components/Post/PostCard";
import { Post } from "../services/post";
import {getPosts} from "../services/post";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";

const PostByCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(category);
    // TODO: Fetch posts by category
    const fetchPosts = async () => {
      const response = await getPosts(category);
      return response;
    };
    fetchPosts().then((response) => {
      if (response) {
        setPosts(response);
        setLoading(false);
      }
    }
    );
  }, [category]);

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
      <h1>Posts by category: {category}</h1>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </>
  );
};

export default PostByCategory;
