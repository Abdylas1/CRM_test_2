import React from 'react';
import { Home } from '../../../Home';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const HomeToken = () => {
  const token = useSelector(state => state.getToken.token);
  console.log(token);
  return <>{token ? <Home /> : <Navigate to="/auth/authorization" />}</>;
};

