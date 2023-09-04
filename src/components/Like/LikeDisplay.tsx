import { useState } from "react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import LikeButton from "./LikeButton";
import { useAuth } from "../../hooks/useAuth";

interface LikeProps {
  likes: string[];
  ulid: string;
  toggleLike: (isLiked: boolean) => void;
}

const LikeDisplay = ({ likes, ulid, toggleLike }: LikeProps) => {
  const [likesTooltip, setLikesTooltip] = useState(false);
  const { username } = useAuth();

  const handleLikesMouseEnter = () => {
    if (likes.length > 0) {
      setLikesTooltip(true);
    }
  };

  const handleLikesMouseLeave = () => {
    setLikesTooltip(false);
  };

  const truncatedLikes = likes.length >= 5 ? likes.slice(0, 5) : [];
  return (
    <div
      className="mt-3"
      onMouseEnter={handleLikesMouseEnter}
      onMouseLeave={handleLikesMouseLeave}
    >
      <OverlayTrigger
        placement="top"
        show={likesTooltip}
        overlay={<Tooltip>{truncatedLikes.join(", ")}</Tooltip>}
      >
        <>
          <LikeButton
            id={ulid}
            isLiked={username !== undefined ? likes.includes(username) : false}
            toggleLike={toggleLike}
          />
          <span className="mx-3">Likes: {likes.length} </span>
        </>
      </OverlayTrigger>
    </div>
  );
};

export default LikeDisplay;
