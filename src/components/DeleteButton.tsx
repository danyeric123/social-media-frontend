import { useState } from "react";
import { Button } from "react-bootstrap";

import DeleteConfirmationModal from "./DeleteModal";

interface DeleteProps {
  id: string;
  commentId?: string;
  handleDelete: (
    e: React.FormEvent,
    commentId: string | undefined,
    id: string,
  ) => void;
}

const DeleteButton = ({ id, commentId, handleDelete }: DeleteProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        onDelete={(e: React.FormEvent): void => {
          handleDelete(e, commentId, id);
          setShowModal(false);
        }}
      />
    </>
  );
};

export default DeleteButton;
