// AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ children }) => {
  const user = useSelector(state => state.user.user);

  if (!user) return <Navigate to="/" replace />;

  if (user.role !== "ADMIN") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default AdminRoutes;
