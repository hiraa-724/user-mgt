import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../components/Home";
import Create from "../components/Create";
import Read from "../components/Read";
import Update from "../components/Update";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPass from "../components/ForgotPass";
import Authors from "../components/Authors";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "USER") {
      return <Navigate to="/authors" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return children;
};

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes based on user role */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Authors />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/read/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Read />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
