import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

import { editUser } from "../../services/users";
import ErrorPanel from "../ErrorPanel";

const ProfileEdit = () => {
  const location = useLocation();
  const initialProfile = { ...location.state };
  console.log(initialProfile);
  const oldUsername = initialProfile.username;

  const [username, setUsername] = useState(initialProfile.username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(initialProfile.avatar);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newPassword !== confirmPassword ||
      (!/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(avatar as string) &&
        avatar !== "")
    ) {
      setErrorMessage("Invalid input");
      setIsError(true);
      return;
    }
    const request = {
      username: username,
      password: newPassword !== "" ? newPassword : initialProfile.password,
      avatar: avatar,
    };
    editUser(oldUsername, request)
      .then(() => {
        navigate(`/profiles/${username}`);
      })
      .catch((error) => {
        setErrorMessage(`${error.message}: ${error.response.data.reason}`);
        if (error.response.data.reason === "username already exists") {
          setUsernameExists(true);
          setErrorMessage("Username already exists");
        }
        setIsError(true);
        console.log(error);
      });
  };

  return (
    <>
      <Container fluid="md">
        <p className="subtitle">Edit your profile</p>
        <hr className="divider" />
        <ErrorPanel
          error={errorMessage}
          showError={isError}
          setShowError={setIsError}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {usernameExists && (
              <Form.Text style={{ color: "red" }}>
                Username already exists
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword !== newPassword && (
              <Form.Text style={{ color: "red" }}>
                Passwords don't match
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            {/* <Form.Control
              type="file"
              onChange={(e) => setAvatar(e.target.files![0])}
            /> */}
            <Form.Control
              type="url"
              placeholder="Enter avatar url"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            {!/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(avatar as string) &&
              avatar !== "" && (
                <Form.Text style={{ color: "red" }}>
                  URL needs to be a valid image
                </Form.Text>
              )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ProfileEdit;
