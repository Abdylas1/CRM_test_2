import React from 'react';
import { useNavigate } from 'react-router-dom';
import { columnTableConfig } from '../../../../shared/config/columnTableConfig';
import { Tasks } from '../../../Tasks';
import { Table } from 'antd';

export const TableTasks = ({ tasks, handlePageChange, page }) => {
  const navigate = useNavigate();

  const handleRowClick = record => {
    console.log(record);
    navigate(`/details-notes/${record._id}`);
  };
  return (
    <>
      <Table
        dataSource={tasks.items}
        columns={columnTableConfig}
        rowKey="_id"
        style={{ cursor: 'pointer' }}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={false}
        onChange={handlePageChange}
        expandedRowRender={record => <Tasks items={[record]} page={page} />}
        scroll={{ y: 350 }}
      />
    </>
  );
};
