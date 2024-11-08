import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfoThunk } from '../../../../shared/slicer/user/getUserInfoSlice';
import { Form, Typography, Row, Col, Dropdown, Space, Alert } from 'antd';
import img from '../../../../shared/images/user.jpg';
import s from './Profile.module.scss';
import { ChangePassword } from '../../../../features/ChangePassword';
import useModal from '../../../../shared/hooks/useModal';
import Modal from '../../../../shared/ui/Modal/Modal';
import { BiLogOut } from 'react-icons/bi';
import { ChangeProfile } from '../../../../features/ChangeProfile';
import { clearToken } from '../../../../shared/slicer/token/tokenSlicer';
import { UploadAvatar } from '../../../../features/UploadAvatar';
const { Title } = Typography;

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector(state => state.user);
  const [form] = Form.useForm();

  const { isModalOpen, openModal, closeModal } = useModal();
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  console.log(user);

  useEffect(() => {
    dispatch(fetchUserInfoThunk());
  }, [dispatch]);

  const fetchUserUI = useCallback(() => {
    return dispatch(fetchUserInfoThunk());
  }, [dispatch]);

  const logOutAccount = () => {
    dispatch(clearToken());
  };

  const items = [
    {
      label: <a onClick={openModal}>Change profile</a>,
      key: '0',
    },
    {
      label: <a onClick={() => setIsPasswordModal(true)}>Change password</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a onClick={logOutAccount}>
          <BiLogOut /> Logout
        </a>
      ),
      key: '3',
    },
  ];

  return (
    <>
      {status === 'failed' && (
        <Alert message={'Error'} description={error} type="error" showIcon />
      )}
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <img
            src={
              user?.avatarUrl ? `http://localhost:5252/${user?.avatarUrl}` : img
            }
            alt={img}
          />
        </a>
      </Dropdown>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Row className={s.profileContainer}>
          <Col span={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title level={2}>Профиль</Title>
              <UploadAvatar user={user} fetchUserUI={fetchUserUI} />
              <div className={s.flexWrap}>
                <ChangeProfile
                  fetchUserUI={fetchUserUI}
                  user={user}
                  form={form}
                />
              </div>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal isOpen={isPasswordModal} onClose={() => setIsPasswordModal(false)}>
        <ChangePassword />
      </Modal>
    </>
  );
};

