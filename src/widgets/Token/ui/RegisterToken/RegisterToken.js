import React from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterToken as ImportedRegisterToken } from '../..';
import { useSelector } from 'react-redux';

export const RegisterToken = () => {
  const token = useSelector(state => state.getToken.token);
  console.log(token);
  return <>{token ? <Navigate to="/auth/authorization" /> : <ImportedRegisterToken />}</>;
};
