import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/Auth/AuthContext';
import AlertContext from '../Context/Alert/AlertContext';
const RequiredAuth = () => {
  const { showAlert } = useContext(AlertContext);
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!auth?.accessToken) {
      showAlert("Please login first", "danger");
    }
  }, [auth, showAlert]);

  if (!auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequiredAuth;
