import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PostCard from "../components/Post/PostCard";
import { Post } from "../services/post";

const PostByCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log(category);
    // TODO: Fetch posts by category
  }, [category]);

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
