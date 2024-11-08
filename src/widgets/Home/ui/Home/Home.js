import React, { useEffect, useState } from 'react';
import Pagination from '../../../../shared/ui/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import useFilterSearchParams from '../../../../shared/hooks/useFilterSearchParams';
import { addTaskThunk } from '../../../../shared/slicer/tasks/addTaskSlice';
import { fetchTasksThunk } from '../../../../shared/slicer/tasks/getTasksSlice';
import ContentLayout from '../../../../shared/ui/contentLayout/ContentLayout';
import { Alert, Spin } from 'antd';
import useModal from '../../../../shared/hooks/useModal';
import { AddTask } from '../../../../features/AddTask';
import { SortTasks } from '../../../../features/SortTasks';
import { TableTasks } from '../../../../entities/TableTasks';
export const Home = () => {
  const tasks = useSelector(state => state.tasks);
  const { status, error } = useSelector(state => state.tasks);
  const { searchValue, sortByValue, sortOrderValue, page, updateSearchParams } =
    useFilterSearchParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTasksThunk({
        page,
        pageSize: 8,
        search: searchValue,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
  }, [dispatch, page, searchValue, sortByValue, sortOrderValue]);
  const handleSubmit = async formData => {
    dispatch(addTaskThunk(formData)).then(() => {
      closeModal();
      dispatch(
        fetchTasksThunk({
          page: 1,
          pageSize: 8,
          search: searchValue,
          sortBy: sortByValue,
          sortOrder: sortOrderValue,
        })
      );
      updateSearchParams({ page: 1 }, value => value !== 1);
    });
  };

  const handlePageChange = e => {
    updateSearchParams({ page: e.selected + 1 }, value => value !== 1);
  };

  return (
    <ContentLayout>
      {status === 'failed' && (
        <Alert message={'Error'} description={error} type="error" showIcon />
      )}
      <Spin spinning={status === 'loading'} size="large">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddTask handleSubmit={handleSubmit} />
          <SortTasks />
        </div>
        <TableTasks
          tasks={tasks}
          handlePageChange={handlePageChange}
          page={page}
        />
        <Pagination
          currentPage={page}
          onChangePage={handlePageChange}
          pageCount={tasks.pages}
        />
      </Spin>
    </ContentLayout>
  );
};

