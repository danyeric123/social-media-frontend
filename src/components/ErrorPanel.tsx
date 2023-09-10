import { Button, Modal } from "react-bootstrap";

interface ErrorPanelProps {
  error: string;
  showError: boolean;
  setShowError: (showError: boolean) => void;
}

const ErrorPanel = ({ error, showError, setShowError }: ErrorPanelProps) => {
  const toggleErrorPopup = () => {
    setShowError(!showError);
  };
  return (
    <Modal show={showError} onHide={toggleErrorPopup}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleErrorPopup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorPanel;
