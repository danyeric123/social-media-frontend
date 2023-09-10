import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";

import { likePost, unlikePost } from "../../services/post";

interface LikeButtonProps {
  id: string;
  isLiked: boolean;
  toggleLike: (isLiked: boolean) => void;
}

const LikeButton = ({ id, isLiked, toggleLike }: LikeButtonProps) => {
  // TODO: Implement like/unlike functionality for replies
  const handleLike = async () => {
    !isLiked ? await likePost(id) : await unlikePost(id);
    toggleLike(isLiked);
  };

  return (
    <div className="btn" onClick={handleLike}>
      {!isLiked ? (
        <AiTwotoneLike style={{ color: "blue", fontSize: "1.5rem" }} />
      ) : (
        <AiTwotoneDislike style={{ color: "red", fontSize: "1.5rem" }} />
      )}
    </div>
  );
};

export default LikeButton;
