// src/components/RequireAuth.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggedIn, getRole } from '../services/auth';

export default function RequireAuth({ roles }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles?.length) {
    const role = getRole();
    if (!roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}

