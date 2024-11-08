import React from 'react';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import AppButton from '../../../../shared/ui/Button/Button';
import useModal from '../../../../shared/hooks/useModal';
import { FiPlus } from 'react-icons/fi';
import { formConfig } from '../../../../shared/config/formConfig';
import Modal from '../../../../shared/ui/Modal/Modal';

export const AddNote = ({ handleSubmit }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <AppButton variant="primary" size="small" onClick={openModal}>
        <FiPlus />
        Add Note
      </AppButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig.notes}
          type="create"
        />
      </Modal>
    </>
  );
};

