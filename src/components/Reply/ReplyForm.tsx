import React from "react";
import { Container } from "react-bootstrap";

import { Reply, replyPost } from "../../services/post";

interface ReplyFormProps {
  ulid: string;
  addReply: (reply: Reply) => void;
}

const ReplyForm = ({ ulid, addReply }: ReplyFormProps) => {
  const [reply, setReply] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReply = await replyPost(ulid, reply);
    addReply(newReply);
  };

  return (
    <Container className="w-50">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reply" className="form-label">
            Reply
          </label>
          <textarea
            className="form-control"
            id="reply"
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default ReplyForm;
