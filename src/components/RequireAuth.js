// src/components/RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getRole } from '../services/auth';

export default function RequireAuth({ roles = [] }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(getRole())) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

