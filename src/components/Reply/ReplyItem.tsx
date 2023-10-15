import React, { useState } from "react";
import { Card } from "react-bootstrap";

import LikeDisplay from "./../Like/LikeDisplay";
import { useAuth } from "../../hooks/useAuth";
import { Reply } from "../../services/post";
import DateDisplay from "../DateDisplay";

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply: initialReply }) => {
  const [reply, setReply] = useState<Reply>(initialReply);
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

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Text>{reply.content}</Card.Text>
        <DateDisplay createdAt={reply.createdAt} updatedAt={reply.updatedAt} />
        <LikeDisplay
          likes={reply.likes}
          ulid={reply.ulid}
          toggleLike={toggleLike}
        />
        {/* {reply.replies.length > 0 && (
          <div className="mt-3">
            {reply.replies.map((nestedReply) => (
              <ReplyItem key={nestedReply.ulid} reply={nestedReply} />
            ))}
          </div>
        )} */}
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;
