import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Store the full path including hash for redirect after login
    const returnPath = location.pathname + location.search;
    toast.error('Please login to continue');
    return <Navigate to="/login" state={{ from: { pathname: returnPath } }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 