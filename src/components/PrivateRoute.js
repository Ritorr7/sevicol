// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getRole } from '../services/auth';

export default function PrivateRoute({ roles = [], children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(getRole())) {
    return <Navigate to="/" replace />;
  }
  return children;
}

