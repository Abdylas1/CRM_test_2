import React from 'react';
import s from './errorAlert.module.scss';

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className={s.errorAlert}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;