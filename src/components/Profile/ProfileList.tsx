import { Container, Row } from "react-bootstrap";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

import ProfileCard from "./ProfileCard";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../services";

const ProfileList = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const users = location.state;

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="mt-4">
      <Row>
        {users.map((user: User) => (
          <ProfileCard user={user} />
        ))}
      </Row>
    </Container>
  );
};

export default ProfileList;
