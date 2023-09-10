import { Card } from "react-bootstrap";
import { Col, ListGroup } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

import { User } from "../../services";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Col key={user.username} md={4} className="mb-4">
      <Link to={`/profiles/${user.username}`} className="text-decoration-none">
        <Card>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            {typeof user.avatar === "string" && user.avatar !== "" ? (
              <Card.Img src={user.avatar} />
            ) : (
              <BiUserCircle size={100} />
            )}
          </Card.Body>
          {user.followers !== undefined && user.following !== undefined && (
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Followers: {user.followers.length}
              </ListGroup.Item>
              <ListGroup.Item>
                Following: {user.following.length}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card>
      </Link>
    </Col>
  );
};

export default ProfileCard;
