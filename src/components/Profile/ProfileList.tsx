import { Container, Row } from "react-bootstrap";
import { Navigate } from "react-router";

import ProfileCard from "./ProfileCard";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../services";

interface ProfileListProps {
  users: User[];
}

const ProfileList = ({ users }: ProfileListProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
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

export default ProfileList;
