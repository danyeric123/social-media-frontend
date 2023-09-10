import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { Navigate } from "react-router";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { User } from "../../services/index";
import { Post } from "../../services/post";
import { followUser, getUser } from "../../services/users";
import ErrorPanel from "../ErrorPanel";
import PostCard from "../Post/PostCard";

const Profile = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { username } = useParams();
  const { isAuthenticated, username: viewer } = useAuth();

  const handleFollow = () => {
    if (!username) return;
    if (!user) return;
    if (!viewer) return;
    followUser(username)
      .then(() => {
        const newFollowers =
          user?.followers !== undefined
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              [...user?.followers, { username: viewer }]
            : [{ username: viewer }];
        setUser({ ...user, followers: newFollowers });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`${error.message}: ${error.response.data.reason}`);
        setIsError(true);
      });
  };

  const handleUnfollow = () => {
    if (!username) return;
    if (!user) return;
    if (!viewer) return;
    followUser(username)
      .then(() => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const newFollowers =
          user?.followers !== undefined
            ? user?.followers.filter((follower) => follower.username !== viewer)
            : [];
        setUser({ ...user, followers: newFollowers });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`${error.message}: ${error.response.data.reason}`);
        setIsError(true);
      });
  };

  useEffect(() => {
    // Replace this with your actual backend API call to fetch user data
    const fetchUser = async () => {
      if (!username) return;
      try {
        // Example API call using fetch (replace with your actual API endpoint)
        const response = await getUser(username);
        const userData = response.user;
        const userPosts = response.posts;
        console.log(response);
        setUser(userData);
        setPosts(userPosts);
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
    <>
      <Container className="mt-4">
        <ErrorPanel
          error={errorMessage}
          showError={isError}
          setShowError={setIsError}
        />
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
              {user.followers
                ?.slice(0, 5)
                .map((follower) => (
                  <Link to={`/profiles/${follower.username}`}>
                    {follower.username}
                  </Link>
                ))}
              {user.followers !== undefined && user.followers?.length > 5 && (
                <Link
                  to={`/profiles/${user.username}/followers`}
                  state={user.followers}
                >
                  ...and {user.followers.length - 5} more
                </Link>
              )}
            </p>
            <p>
              Following:{" "}
              {user.following?.slice(0, 5).map((following) => (
                <>
                  <Link to={`/profiles/${following.username}`}>
                    {following.username}
                  </Link>
                  {", "}
                </>
              ))}
              {user.following !== undefined && user.following?.length > 5 && (
                <Link
                  to={`/profiles/${user.username}/following`}
                  state={user.following}
                >
                  ...and {user.following.length - 5} more
                </Link>
              )}
            </p>
          </Col>
        </Row>
        {viewer === username && (
          <Link to={`/profiles/${user.username}/edit`} state={user}>
            <Button variant="primary">Edit Profile</Button>
          </Link>
        )}
        {viewer !== username &&
          viewer !== undefined &&
          (!user.followers
            ?.map((follower) => follower.username)
            .includes(viewer) ? (
            <Button variant="primary" onClick={handleFollow}>
              Follow
            </Button>
          ) : (
            <Button variant="danger" onClick={handleUnfollow}>
              Unfollow
            </Button>
          ))}
      </Container>
      <Container className="mt-4">
        <h3>Posts</h3>
        <hr className="divider" />
        <Row>
          {posts.map((post) => (
            <PostCard key={post.ulid} post={post} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
