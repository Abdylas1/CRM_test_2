import React, { useEffect } from 'react';
import { fetchTasksThunk } from '../../../../shared/slicer/tasks/getTasksSlice';
import { useDispatch } from 'react-redux';
import Item from '../../../../shared/ui/Item/Item';
import { deleteTaskThunk } from '../../../../shared/slicer/tasks/deleteTaskSlice';
import { editTaskThunk } from '../../../../shared/slicer/tasks/editTaskSlice';
import AdaptationLayout from '../../../../shared/ui/AdaptationLayout/AdaptationLayout';
import { toggleTaskThunk } from '../../../../shared/slicer/tasks/toggleTaskSlice';
import useFilterSearchParams from '../../../../shared/hooks/useFilterSearchParams';

export const Tasks = ({ items, page }) => {
  const {
    searchValue,
    categoryValue,
    sortByValue,
    sortOrderValue,
    updateSearchParams,
  } = useFilterSearchParams();
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
  }, [dispatch, page]);

  console.log(items);

  const handleDelete = _id => {
    dispatch(
      fetchTasksThunk({
        page: 1,
        pageSize: 8,
        search: searchValue,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
    dispatch(deleteTaskThunk(_id));
  };

  const handleEditTask = (id, formData) => {
    dispatch(
      fetchTasksThunk({
        page: 1,
        pageSize: 8,
        search: searchValue,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
    dispatch(editTaskThunk({ id, formData }));
  };

  const toggleStatus = id => {
    dispatch(toggleTaskThunk(id));
    dispatch(
      fetchTasksThunk({
        page: 1,
        pageSize: 8,
        search: searchValue,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
  };

  const renderItems = items.map(el => (
    <Item
      key={el._id}
      {...el}
      handleDelete={handleDelete}
      handleEditTask={handleEditTask}
      toggleStatus={toggleStatus}
    />
  ));

  return <AdaptationLayout>{renderItems}</AdaptationLayout>;
};

