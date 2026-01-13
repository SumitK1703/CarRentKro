import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  // If NO token is found in Context/LocalStorage, force them to Home
  if (!token) {
  // You can also change "/" to show the login modal if you prefer
    return <Navigate to="/" replace />;
  }
  // If token exists, show the page
  return children;
};
export default ProtectedRoute;