import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DeleteConfirmationModal from "./DeleteModal";
import { deletePost, deleteComment } from "../services/post";

interface DeleteProps {
  id: string;
  commentId?: string;
}

const DeleteButton = ({ id, commentId }: DeleteProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    if (commentId) {
      console.log("delete comment", commentId);

      deleteComment(id, commentId)
        .then(() => {
          setShowModal(false);
          window.location.reload();
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
      <Button
        variant="danger"
        className="float-right"
        onClick={handleShowModal}
      >
        Delete
      </Button>
      <DeleteConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DeleteButton;
