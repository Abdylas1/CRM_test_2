import React from 'react';
import { Card, Button, Tag, Typography, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
import { Edit } from '../../../features/Edit';
import s from './Item.module.scss';
import AppButton from '../Button/Button';

const { Text } = Typography;

const Item = ({
  _id,
  status,
  title,
  handleDelete,
  handleEditTask,
  toggleStatus,
}) => {
  const statusStyles = status ? s.completed : s.processing;
  const statusText = status ? 'Completed' : 'Processing';
  const editConfig = {
    title,
    status,
  };
  console.log(status);
  return (
    <Card
      title={<Text strong>{title}</Text>}
      extra={<Tag color={status ? 'green' : 'red'}>{statusText}</Tag>}
      actions={[
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditTask(_id, editConfig)}
        >
          <Edit
            type="edit"
            editConfig={editConfig}
            id={_id}
            handleEditTask={handleEditTask}
          />
        </Button>,
        <Button
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDelete(_id)}
        >
          <AppButton variant="tertiary">delete</AppButton>
        </Button>,
        <Button type="link" icon={<StrikethroughOutlined />}>
          <AppButton onClick={() => toggleStatus(_id)} variant="tertiary">
            status
          </AppButton>
        </Button>,
      ]}
      className={s.box}
    >
      <Space direction="vertical">
        <p>
          <Text>Title: </Text>
          <Text strong>{title}</Text>
        </p>
        <p>
          <Text>Status: </Text>
          <Text className={statusStyles}>{statusText}</Text>
        </p>
      </Space>
    </Card>
  );
};

export default Item;
