import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDetailsThunk } from '../../../../shared/slicer/details/getDetailsSlice';
import { getNoteThunk } from '../../../../shared/slicer/notes/getNoteSlice';
import { Spin, Alert, Button } from 'antd';
import ContentLayout from '../../../../shared/ui/contentLayout/ContentLayout';
import s from './IntervalTask.module.scss';

export const IntervalTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.details.items);
  const notes = useSelector(state => state.notes.items);
  const detailsStatus = useSelector(state => state.details.status);
  const notesStatus = useSelector(state => state.notes.status);
  const error = useSelector(state => state.details.error || state.notes.error);

  useEffect(() => {
    dispatch(getDetailsThunk(id));
    dispatch(getNoteThunk({ taskId: id, page: 1, pageSize: 10 }));
  }, [dispatch, id]);

  if (detailsStatus === 'loading' || notesStatus === 'loading') {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <ContentLayout>
      <div className={s.wrap}>
        <div className={s.title}>
          <h3>Details</h3>
          <h3>Notes</h3>
        </div>
        <div className={s.detailsGrid}>
          <Button type="primary">
            <Link to={`/details-notes/${id}/details`}>View Details</Link>
          </Button>
        </div>
        <div>
          <Button type="primary">
            <Link to={`/details-notes/${id}/notes`}>View Notes</Link>
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};

