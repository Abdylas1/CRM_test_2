import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { updatePasswordThunk } from '../../../../shared/slicer/user/updatePasswordSlice';
import styles from './ChangePassword.module.scss';

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handlePasswordFinish = values => {
    const { currentPassword, newPassword } = values;
    dispatch(updatePasswordThunk({ currentPassword, newPassword }))
      .then(() => {
        message.success('Пароль успешно обновлен');
        form.resetFields();
      })
      .catch(err => {
        message.error('Ошибка обновления пароля');
        console.error(err);
      });
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handlePasswordFinish}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
      >
        <Form.Item
          className={styles.formItem}
          name="currentPassword"
          label="Текущий пароль"
          rules={[{ required: true, message: 'Введите текущий пароль' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="newPassword"
          label="Новый пароль"
          rules={[{ required: true, message: 'Введите новый пароль' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="confirmPassword"
          label="Подтверждение нового пароля"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Подтвердите новый пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Введенные пароли не совпадают')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles.formItem}>
          <Button type="primary" htmlType="submit">
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

