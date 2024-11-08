import React from 'react';
import { Layout, theme } from 'antd';
import s from './AppFooter.module.scss';
const { Footer } = Layout;

export const AppFooter = () => {
  const {
    token: { colorPrimary, boxShadow },
  } = theme.useToken();
  return (
    <Footer
      style={{ background: colorPrimary, boxShadow }}
      className={s.footer}
    >
      CRM SYSTEM {new Date().getFullYear()}
    </Footer>
  );
};

