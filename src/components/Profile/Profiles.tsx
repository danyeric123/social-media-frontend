import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";

import ProfileCard from "./ProfileCard";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../services/index";
import { getUsers } from "../../services/users";

const Profiles = () => {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Profiles";
    const fetchProfiles = async () => {
      const response = await getUsers();
      console.log(response);
      return response;
    };
    fetchProfiles().then((response) => {
      setUsers(response.users);
      setLoading(false);
    });
  }, []);

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

  return (
    <Container className="mt-4">
      <Row>
        {users.map((user) => (
          <ProfileCard user={user} />
        ))}
      </Row>
    </Container>
  );
};

export default Profiles;
