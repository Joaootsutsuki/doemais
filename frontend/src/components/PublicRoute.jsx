import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PublicRoute({ children, redirectTo }) {
  const authToken = Cookies.get("auth_token");

  if (authToken) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}

export default PublicRoute;
