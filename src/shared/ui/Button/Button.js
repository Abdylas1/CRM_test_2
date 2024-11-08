import React from 'react';
import s from './Button.module.scss';
import classNames from 'classnames';

const AppButton = ({
  variant = 'primary',
  size = 'small',
  children,
  isLoading = false,
  ...props
}) => {
  const buttonClass = classNames(s.button, s[variant], s[size]);

  return (
    <button className={buttonClass} disabled={isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default AppButton;
