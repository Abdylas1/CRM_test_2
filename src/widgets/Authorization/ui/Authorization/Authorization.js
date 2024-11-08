import { Layout } from 'antd';
import React from 'react';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formConfig } from '../../../../shared/config/formConfig';
import { AuthThunk } from '../../../../shared/slicer/auth/authSlicer';
export const Authorization = () => {
  const dispatch = useDispatch();
  const handleSubmit = (formData) => {
    dispatch(AuthThunk(formData))
    console.log(formData);
  };  
  return (
    <Layout>
      <div className="container">
        <ShareForm
          type="login"
          handleSubmit={handleSubmit}
          config={formConfig}
        />
        <NavLink to="/auth/register">Регистрация</NavLink>
      </div>
    </Layout>
  );
};

