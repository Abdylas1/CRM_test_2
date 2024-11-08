import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFilterSearchParams from '../../../../shared/hooks/useFilterSearchParams';
import useDebounce from '../../../../shared/hooks/useDebounce.tsx';
import { fetchTasksThunk } from '../../../../shared/slicer/tasks/getTasksSlice';
import { Input } from 'antd';

export const Search = () => {
  const { searchValue, sortByValue, sortOrderValue, updateSearchParams } =
    useFilterSearchParams();
  const debouncedSearch = useDebounce(searchValue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchTasksThunk({
        page: 1,
        pageSize: 8,
        search: debouncedSearch,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
  }, [debouncedSearch, sortByValue, sortOrderValue, dispatch]);
  const handleFilterChange = (key, value) => {
    updateSearchParams({ [key]: value }, value => !!value);
  };
  return (
    <>
      <Input
        placeholder="Search tasks"
        value={searchValue}
        onChange={e => handleFilterChange('search', e.target.value)}
        style={{ width: '40%' }}
      />
    </>
  );
};

