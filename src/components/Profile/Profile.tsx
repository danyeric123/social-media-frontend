import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { Navigate } from "react-router";
import { useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { User } from "../../services/index";
import { getUser } from "../../services/users";
import ErrorPanel from "../ErrorPanel";

const Profile = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>("");
  const { username } = useParams();
  const { isAuthenticated, username: viewer } = useAuth();

  useEffect(() => {
    // Replace this with your actual backend API call to fetch user data
    const fetchUser = async () => {
      if (!username) return;
      try {
        // Example API call using fetch (replace with your actual API endpoint)
        const response = await getUser(username);
        const userData = response.user;
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorPanel
        error="User not found"
        showError={isError}
        setShowError={setIsError}
      />
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col sm={3}>
          {user?.avatar && typeof user.avatar == "string" ? (
            <Image src={user?.avatar} alt="User Avatar" roundedCircle fluid />
          ) : (
            <BiUserCircle size={100} />
          )}
        </Col>
        <Col sm={9}>
          <h3>{user?.username}</h3>
          {/* {loading ? (
            <p>Loading...</p>
          ) : (
            <p>
              {user?.bio || 'No bio available.'}
            </p>
          )} */}
          <p>
            Followers:{" "}
            {user.followers?.slice(0, 5).map((follower) => follower.username)}
          </p>
          <p>
            Following:{" "}
            {user.following?.slice(0, 5).map((following) => following.username)}
          </p>
        </Col>
      </Row>
      {viewer === username && (
        <Button variant="primary" href={`/profiles/${user.username}/edit`}>
          Edit Profile
        </Button>
      )}
    </Container>
  );
};

export default Profile;
