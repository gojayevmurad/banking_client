import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
