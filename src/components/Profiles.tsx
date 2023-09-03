import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Profiles = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <div>Profiles</div>;
};

export default Profiles;
