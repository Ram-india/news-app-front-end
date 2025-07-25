import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const PrivateRoute = ({ children }) => {
  const { token, user, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>; //  while fetching user
  if (!token || !user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;