import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ userData, children }) {
    // console.log("ProtectedRoute userData:", userData);
    // console.log("ProtectedRoute token:", localStorage.getItem("token"));
    if (userData === null && localStorage.getItem("token") === null) {
        // Logged Out
        return <Navigate to="/login" />;
    } else {
        // Logged In User
        return children;
    }
}
