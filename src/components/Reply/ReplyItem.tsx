import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import LikeDisplay from "./../Like/LikeDisplay";
import ReplyForm from "./ReplyForm";
import { useAuth } from "../../hooks/useAuth";
import { Reply } from "../../services/post";
import DateDisplay from "../DateDisplay";
import DeleteButton from "../DeleteButton";

interface ReplyItemProps {
  reply: Reply;
  postId: string;
  handleDelete: (
    e: React.FormEvent,
    commentId: string | undefined,
    id: string,
  ) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  reply: initialReply,
  postId,
  handleDelete,
}) => {
  const [reply, setReply] = useState<Reply>(initialReply);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content); // Edited content
  const [showForm, setShowForm] = useState(false);
  const { username } = useAuth();

  const toggleLike = (isLiked: boolean) => {
    if (!username) return;
    if (isLiked) {
      // Unlike post
      const newLikes = reply.likes.filter((user) => user !== username);
      setReply({ ...reply, likes: newLikes });
    } else {
      // Like post
      const newLikes = [...reply.likes, username];
      setReply({ ...reply, likes: newLikes });
    }
  };

  const handleClick = () => {
    if (username === reply.author) {
      setEditing(true);
    }
  };

  const handleSave = () => {
    // Save reply
    setReply({ ...reply, content: editedContent });
    setEditing(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const addReply = (reply: Reply) => {
    console.log(reply);
    setReply({
      ...reply,
      replies: reply.replies ? [...reply.replies, reply] : [reply],
    });
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Body className="d-flex justify-content-between">
          <div onClick={handleShowForm}>
            {!editing ? (
              <Card.Text onClick={handleClick}>{reply.content}</Card.Text>
            ) : (
              <div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="danger" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
            <DateDisplay
              createdAt={reply.createdAt}
              updatedAt={reply.updatedAt}
            />
            <LikeDisplay
              likes={reply.likes}
              ulid={reply.ulid}
              toggleLike={toggleLike}
              commentId={reply.ulid}
            />
            {reply.replies && reply.replies.length > 0 && (
              <div className="mt-3">
                {reply.replies.map((nestedReply) => (
                  <ReplyItem
                    key={nestedReply.ulid}
                    reply={nestedReply}
                    postId={postId}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
          {username === reply.author && (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <i className="fas fa-ellipsis-h"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{ backgroundColor: "whitesmoke", boxShadow: "none" }}
              >
                <Dropdown.Item
                  style={{ backgroundColor: "whitesmoke", boxShadow: "none" }}
                >
                  <DeleteButton
                    commentId={reply.ulid}
                    id={postId}
                    handleDelete={handleDelete}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Body>
        {showForm && (
          <>
            <ReplyForm
              ulid={postId}
              addReply={addReply}
              parent_ulid={reply.ulid}
              handleHideForm={handleHideForm}
            />
          </>
        )}
      </Card>
    </>
  );
};

export default ReplyItem;
