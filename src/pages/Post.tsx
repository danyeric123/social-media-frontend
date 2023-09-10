import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Card, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import DateDisplay from "../components/DateDisplay";
import LikeDisplay from "../components/Like/LikeDisplay";
import ReplyForm from "../components/Reply/ReplyForm";
import ReplyItem from "../components/Reply/ReplyItem";
import { useAuth } from "../hooks/useAuth";
import { Reply, getPost, Post as PostType } from "../services/post";

const Post = () => {
  const param = useParams();
  const { id } = param;
  const { username } = useAuth();
  const [post, setPost] = useState<PostType | undefined>(undefined);
  moment.locale("en");

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const response = await getPost(id);
        console.log(response);
        setPost(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const { title, content, categories, createdAt, updatedAt, likes } = post;

  const toggleLike = (isLiked: boolean) => {
    if (!username) return;
    if (isLiked) {
      // Unlike post
      const newLikes = likes.filter((user) => user !== username);
      setPost({ ...post, likes: newLikes });
    } else {
      // Like post
      const newLikes = [...likes, username];
      setPost({ ...post, likes: newLikes });
    }
  };

  const addReply = (reply: Reply) => {
    const newReplies = [...post.replies, reply];
    setPost({ ...post, replies: newReplies });
  };

  return (
    <>
      <Container>
        <h1 className="mt-5">{title}</h1>
        <Card className="mt-4">
          <Card.Body>
            <Card.Text>{content}</Card.Text>
            <div>
              {categories &&
                categories.map((category, index) => (
                  <Badge key={index} bg="secondary" className="mr-2 mt-2">
                    {category}
                  </Badge>
                ))}
            </div>
            <DateDisplay createdAt={createdAt} updatedAt={updatedAt} />
            <LikeDisplay
              likes={likes}
              ulid={post.ulid}
              toggleLike={toggleLike}
            />
          </Card.Body>
          {username === post.author ? (
            <Link
              to={`/posts/${post.ulid}/edit`}
              className="text-decoration-none text-white"
              state={post}
            >
              {" "}
              <Button variant="primary" className="mb-3">
                Edit
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Card>
        <div className="mt-4">
          <h2>Replies</h2>
          <ReplyForm ulid={post.ulid} addReply={addReply} />
          {post.replies.map((reply) => (
            <ReplyItem key={reply.ulid} reply={reply} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Post;
