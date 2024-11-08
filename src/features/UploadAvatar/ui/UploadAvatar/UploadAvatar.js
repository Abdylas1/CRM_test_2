import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './UploadAvatar.module.scss';
import { Button, Upload, message, Avatar } from 'antd';
import { updateAvatarThunk } from '../../../../shared/slicer/user/updateAvatarSlice';
import { UploadOutlined } from '@ant-design/icons';
import img from '../../../../shared/images/user.jpg';

export const UploadAvatar = ({ user, fetchUserUI }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarKey, setAvatarKey] = useState(Date.now());

  const dispatch = useDispatch();
  const handleAvatarChange = ({ file }) => {
    console.log('avatar change file:', file);
    setAvatarFile(file);
  };

  const handleUpload = () => {
    if (!avatarFile) {
      message.error('Выберите файл для загрузки');
      return;
    }
    console.log('Selected file:', avatarFile);

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    console.log('FormData content:', formData.get('avatar'));

    dispatch(updateAvatarThunk(formData))
      .then(() => {
        message.success('Аватар обновлен');
        setAvatarKey(Date.now());
        fetchUserUI();
      })
      .catch(err => {
        message.error('Ошибка обновления аватара');
        console.error(err);
      });
  };
  return (
    <>
      <Avatar
        className={s.image}
        size={100}
        src={user?.avatarUrl ? `http://localhost:5252/${user?.avatarUrl}` : img}
      />
      <Upload
        name="avatar"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleAvatarChange}
      >
        <Button icon={<UploadOutlined />}>Загрузить новый аватар</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} disabled={!avatarFile}>
        Загрузить аватар
      </Button>
    </>
  );
};
