import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Posts = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <div>Posts</div>
    </>
  );
};

export default Posts;
