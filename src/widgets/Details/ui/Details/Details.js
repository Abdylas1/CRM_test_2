import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailsThunk } from '../../../../shared/slicer/details/getDetailsSlice';
import { createDetailsThunk } from '../../../../shared/slicer/details/createDetailsSlice';
import { Spin, Alert, Typography } from 'antd';
import ContentLayout from '../../../../shared/ui/contentLayout/ContentLayout';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import useModal from '../../../../shared/hooks/useModal';
import AppButton from '../../../../shared/ui/Button/Button';
import { FiPlus } from 'react-icons/fi';
import Modal from '../../../../shared/ui/Modal/Modal';
import { formConfig } from '../../../../shared/config/formConfig';
import s from './Details.module.scss';

const { Paragraph } = Typography;

export const Details = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const details = useSelector(state => state.details.items);
  const status = useSelector(state => state.details.status);
  const error = useSelector(state => state.details.error);
  const { isModalOpen, openModal, closeModal } = useModal();

  const text = details?.task?.details?.text;

  useEffect(() => {
    dispatch(getDetailsThunk(id));
  }, [dispatch, id]);

  const handleSubmit = formData => {
    dispatch(createDetailsThunk({ id, newDetails: formData })).then(() => {
      closeModal();
      dispatch(getDetailsThunk(id));
    });
  };

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <ContentLayout>
      <div className={s.detailsWrapper}>
        <div className={s.header}>
          <h2>Details</h2>
          <AppButton variant="primary" size="small" onClick={openModal}>
            <FiPlus />
            Add Details
          </AppButton>
        </div>
        <div className={s.detailsContent}>
          {details ? (
            <Paragraph>{text}</Paragraph>
          ) : (
            <Paragraph>No details available.</Paragraph>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig}
          type="details"
        />
      </Modal>
    </ContentLayout>
  );
};
