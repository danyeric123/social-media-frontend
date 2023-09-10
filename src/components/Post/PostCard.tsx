import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Post } from "../../services/post";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <>
      <Card className="mt-3">
        <Link to={`/posts/${post.ulid}`} className="text-decoration-none">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <hr className="divider" />
            <Card.Text className="text-muted">
              {post.createdAt !== undefined
                ? post.createdAt.toLocaleString()
                : ""}
            </Card.Text>
            <Card.Text>{post.content}</Card.Text>
            <Card.Subtitle className="text-muted">
              <b>Categories</b>:{" "}
              {post.categories !== undefined ? post.categories.join(", ") : ""}
              <hr className="divider" />
            </Card.Subtitle>
            <Card.Text className="text-muted">
              {post.likes.length} likes
            </Card.Text>
            <Card.Text className="text-muted">
              {post.replies.length} replies
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default PostCard;
