import React from "react";
import { Container } from "react-bootstrap";

import { Reply, replyPost } from "../../services/post";

interface ReplyFormProps {
  ulid: string;
  parent_ulid?: string;
  addReply: (reply: Reply) => void;
  handleHideForm: () => void;
}

const ReplyForm = ({
  ulid,
  addReply,
  parent_ulid,
  handleHideForm,
}: ReplyFormProps) => {
  const [reply, setReply] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(parent_ulid);
    const newReply = await replyPost(
      ulid,
      reply,
      parent_ulid ? parent_ulid : "",
    );
    setReply("");
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleHideForm}
        >
          Cancel
        </button>
      </form>
    </Container>
  );
};

export default ReplyForm;
