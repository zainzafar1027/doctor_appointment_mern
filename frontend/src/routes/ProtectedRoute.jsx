import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  // Sanitize token and role to remove leading and trailing double quotes and backslashes
  let sanitizedToken = token;
  let sanitizedRole = role;

  if (typeof sanitizedToken === "string") {
    // Remove leading and trailing double quotes
    sanitizedToken = sanitizedToken.replace(/^"|"$/g, "");

    // Remove backslashes
    sanitizedToken = sanitizedToken.replace(/\\/g, "");
  }
  if (typeof sanitizedRole === "string") {
    // Remove leading and trailing double quotes
    sanitizedRole = sanitizedRole.replace(/^"|"$/g, "");

    // Remove backslashes
    sanitizedRole = sanitizedRole.replace(/\\/g, "");
  }

  const modifiedToken = sanitizedToken.replace(/[\/"]/g, "");
  const modifiedRole = sanitizedRole.replace(/[\/"]/g, "");

  // Check if user is authenticated
  const isAuthenticated = modifiedToken !== null && modifiedToken !== undefined;

  // Check if user's role is allowed for the route
  const isAllowed = modifiedRole && allowedRoles.includes(modifiedRole);

  // Redirect to login page if user is not authenticated or role is not allowed
  if (!isAuthenticated || !isAllowed) {
    return <Navigate to="/login" replace={true} />;
  }

  // Render the children if user is authenticated and role is allowed
  return children;
};

export default ProtectedRoute;
