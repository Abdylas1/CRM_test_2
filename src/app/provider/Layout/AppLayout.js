import { Layout } from 'antd';
import React from 'react';
import { AppHeader } from '../../../widgets/Header';
import { AppFooter } from '../../../widgets/Footer';
import { Sidebar } from '../../../widgets/Sider';
import s from './AppLayout.module.scss';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Layout className={s.layout}>
      <Sidebar />
      <Layout className={s.siteLayout}>
        <AppHeader />
        <Outlet />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
