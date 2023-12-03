import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Card, Badge, Button, Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DateDisplay from "../components/DateDisplay";
import DeleteButton from "../components/DeleteButton";
import LikeDisplay from "../components/Like/LikeDisplay";
import ReplyForm from "../components/Reply/ReplyForm";
import ReplyItem from "../components/Reply/ReplyItem";
import { useAuth } from "../hooks/useAuth";
import { Reply, getPost, Post as PostType } from "../services/post";
import { deletePost, deleteComment } from "../services/post";

const Post = () => {
  const param = useParams();
  const { id } = param;
  const { username } = useAuth();
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
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

  if (!post) {
    return (
      <div>
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );
  }

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

  const handleHideForm = () => {
    setShowForm(false);
  };

  const addReply = (reply: Reply) => {
    const newReplies = [...post.replies, reply];
    setPost({ ...post, replies: newReplies });
  };

  const handleDelete = (
    e: React.FormEvent,
    commentId: string | undefined = undefined,
    id: string,
  ) => {
    e.preventDefault();
    if (commentId) {
      deleteComment(id, commentId)
        .then(() => {
          setPost({
            ...post,
            replies: post.replies.filter((reply) => reply.ulid !== commentId),
          });
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    deletePost(id)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <Link
                      to={`/posts/category/${category}`}
                      style={{ color: "white" }}
                    >
                      {category}{" "}
                    </Link>
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
            <>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="bg-transparent border-0"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ backgroundColor: "whitesmoke", boxShadow: "none" }}
                >
                  <Dropdown.Item
                    style={{ backgroundColor: "whitesmoke", boxShadow: "none" }}
                  >
                    <Link
                      to={`/posts/${post.ulid}/edit`}
                      className="text-decoration-none text-white"
                      state={post}
                    >
                      <Button variant="primary" className="mb-3">
                        Edit
                      </Button>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{ backgroundColor: "whitesmoke", boxShadow: "none" }}
                  >
                    <DeleteButton id={post.ulid} handleDelete={handleDelete} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <></>
          )}
        </Card>
        <hr className="divider" />
        <div className="mt-4">
          {showForm ? (
            <ReplyForm
              ulid={post.ulid}
              addReply={addReply}
              handleHideForm={handleHideForm}
            />
          ) : (
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Reply
            </Button>
          )}
          {post.replies.map((reply) => (
            <ReplyItem
              key={reply.ulid}
              reply={reply}
              postId={post.ulid}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Post;
