import React from 'react';
import Button from '../../../../shared/ui/Button/Button';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import Modal from '../../../../shared/ui/Modal/Modal';
import { formConfig } from '../../../../shared/config/formConfig';
import useModal from '../../../../shared/hooks/useModal';
import { EditTwoTone } from '@ant-design/icons';

export const Edit = ({ editConfig, id, handleEditTask, disabled, type }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleCloseAndEdit = formData => {
    console.log(formData, id);
    handleEditTask(id, formData);
    closeModal();
  };

  return (
    <>
      <Button variant="tertiary" size="small" onClick={openModal}>
        Edit
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <h2>
          <EditTwoTone />
          {formConfig[type].title}
        </h2>
        <ShareForm
          editConfig={editConfig}
          type={type}
          config={formConfig}
          handleSubmit={handleCloseAndEdit}
          disabled={disabled}
        />
      </Modal>
    </>
  );
};

