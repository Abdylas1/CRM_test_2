import { Select } from 'antd';
import React from 'react';
import useFilterSearchParams from '../../../../shared/hooks/useFilterSearchParams';

export const SortTasks = () => {
  const { Option } = Select;

  const { sortByValue, sortOrderValue, updateSearchParams } =
    useFilterSearchParams();

  const handleFilterChange = (key, value) => {
    updateSearchParams({ [key]: value }, value => !!value);
  };
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <Select
        value={sortByValue}
        onChange={value => handleFilterChange('sortBy', value)}
        style={{ marginRight: '10px' }}
      >
        <Option value="">All</Option>
        <Option value="createdAt">Created At</Option>
        <Option value="title">Title</Option>
        <Option value="status">Status</Option>
      </Select>
      <Select
        value={sortOrderValue}
        onChange={value => handleFilterChange('sortOrder', value)}
        style={{ marginRight: '10px' }}
      >
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>
    </div>
  );
};

