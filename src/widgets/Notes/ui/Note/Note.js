import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNoteThunk } from '../../../../shared/slicer/notes/getNoteSlice';
import { createNoteThunk } from '../../../../shared/slicer/notes/createNoteSlice';
import { Spin, Alert, Typography } from 'antd';
import ContentLayout from '../../../../shared/ui/contentLayout/ContentLayout';
import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import useModal from '../../../../shared/hooks/useModal';
import AppButton from '../../../../shared/ui/Button/Button';
import { FiPlus } from 'react-icons/fi';
import Modal from '../../../../shared/ui/Modal/Modal';
import { formConfig } from '../../../../shared/config/formConfig';
import s from './Note.module.scss';

const { Paragraph } = Typography;

export const Note = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.items);
  const status = useSelector(state => state.notes.status);
  const error = useSelector(state => state.notes.error);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(getNoteThunk({ taskId: id, page: 1, pageSize: 10 }));
  }, [dispatch, id]);

  const handleSubmit = formData => {
    dispatch(createNoteThunk({ taskId: id, newNote: formData })).then(() => {
      closeModal();
      dispatch(getNoteThunk({ taskId: id, page: 1, pageSize: 10 }));
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
      <div className={s.notesWrapper}>
        <div className={s.header}>
          <h3>Notes</h3>
          <AppButton variant="primary" size="small" onClick={openModal}>
            <FiPlus />
            Add Note
          </AppButton>
        </div>
        {notes.map(note => (
          <div key={note._id} className={s.noteItem}>
            <Paragraph ellipsis={{ rows: 2 }}>{note.text}</Paragraph>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleSubmit}
          config={formConfig}
          type="notes"
        />
      </Modal>
    </ContentLayout>
  );
};
