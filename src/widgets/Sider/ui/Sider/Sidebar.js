import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const items = [
  { label: 'Tasks', key: '1', icon: <PieChartOutlined />, path: '/' },
  { label: 'Notes', key: '2', icon: <BookOutlined />, path: '/notes' },
  {
    label: 'Profile',
    key: '3',
    icon: <UserOutlined />,
  },
  {
    label: 'Team',
    key: 'sub2',
    icon: <TeamOutlined />,
    children: [
      { label: 'Team 1', key: '6', path: '/team/team1' },
      { label: 'Team 2', key: '8', path: '/team/team2' },
    ],
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = ({ keyPath }) => {
    const key = keyPath[0];
    const item = findItemByKey(items, key);
    if (item) {
      navigate(item.path);
    }
  };

  const findItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
};

