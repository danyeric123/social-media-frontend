import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";

import {
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
} from "../../services/post";

interface LikeButtonProps {
  id: string;
  isLiked: boolean;
  toggleLike: (isLiked: boolean) => void;
  commentId?: string;
}

const LikeButton = ({
  id,
  isLiked,
  toggleLike,
  commentId,
}: LikeButtonProps) => {
  // TODO: Implement like/unlike functionality for replies
  const handleLike = async () => {
    if (commentId) {
      !isLiked
        ? await likeComment(id, commentId)
        : await unlikeComment(id, commentId);
      console.log("like comment", commentId);
    } else {
      !isLiked ? await likePost(id) : await unlikePost(id);
    }
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
