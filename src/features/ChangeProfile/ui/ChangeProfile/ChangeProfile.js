import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProfileThunk } from '../../../../shared/slicer/user/updateProfileSlice';

export const ChangeProfile = ({ user, form, fetchUserUI }) => {
  const dispatch = useDispatch();
  const handleFinish = values => {
    dispatch(updateProfileThunk(values))
      .then(() => {
        message.success('Профиль обновлен');
        fetchUserUI();
      })
      .catch(() => {
        message.error('Ошибка обновления профиля');
      });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: user?.name,
        email: user?.email,
      }}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваше имя',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваш email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Обновить профиль
        </Button>
      </Form.Item>
    </Form>
  );
};

