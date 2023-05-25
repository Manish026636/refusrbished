import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, isChair }) => {
  const { is_authenticated } = useSelector((state) => state.user);
  const { delegate_info } = useSelector((state) => state.delegate_details);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (is_authenticated === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true) {
    return <Navigate to="/login" />;
  }
  if (isChair && isChair !== delegate_info?.is_chair_person) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
