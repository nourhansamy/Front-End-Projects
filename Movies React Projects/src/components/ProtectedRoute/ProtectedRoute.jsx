import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ userData, children }) {
  if (userData === null && localStorage.getItem("token") === null) {
    // Go To Login
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
