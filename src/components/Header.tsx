import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout, username } = useAuth();

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <FaFacebookF />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/profiles">
              Profiles
            </Nav.Link>
            {!isAuthenticated() ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {isAuthenticated() && (
          <Navbar.Text className="mx-4">
            Signed in as: <Link to={`/profiles/${username}`}>{username}</Link>
          </Navbar.Text>
        )}
        <Form className="d-flex">
          <Form.Control type="text" placeholder="Search" className="mx-3" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
