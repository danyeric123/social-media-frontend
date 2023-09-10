import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ErrorPanel from "./ErrorPanel";
import { signup } from "../services/index";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | string | undefined>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      (!/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(avatar as string) &&
        avatar !== "")
    ) {
      console.log("error");
      return;
    }
    const request = {
      username: username,
      password: password,
      avatar: avatar,
    };
    signup(request)
      .then(() => {
        navigate("/");
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
      <h1 className="title">Signup</h1>
      {isError && (
        <ErrorPanel
          error={errorMessage}
          showError={isError}
          setShowError={setIsError}
        />
      )}
      <Container fluid="md">
        <p className="subtitle">Signup for an account</p>
        <hr className="divider" />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameExists && (
              <Form.Text style={{ color: "red" }}>
                Username already exists
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword !== password && (
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

export default Signup;
