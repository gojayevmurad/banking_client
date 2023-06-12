import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  if (!auth) navigate("/");

  return children;
};

export default PrivateRoute;
