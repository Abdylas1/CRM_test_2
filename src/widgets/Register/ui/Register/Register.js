import { Layout } from 'antd';
import React from 'react';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../../../shared/slicer/auth/registerSlicer';
import { formConfig } from '../../../../shared/config/formConfig';

export const Register = () => {
  const dispatch = useDispatch();
  const handleSubmit = formData => {
    dispatch(registerThunk(formData));
  };
  return (
    <Layout>
      <div className="container">
        <ShareForm
          type="register"
          handleSubmit={handleSubmit}
          config={formConfig}
        />
        <NavLink to="/auth/authorization">Войти</NavLink>
      </div>
    </Layout>
  );
};

