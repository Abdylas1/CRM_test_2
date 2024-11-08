import React from 'react';
import s from './AppHeader.module.scss';
import { Header } from 'antd/es/layout/layout';
import { theme } from 'antd';
import { Profile } from '../../../Profile';
import { Search } from '../../../../entities/Search';
export const AppHeader = () => {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgBase }} className={s.header}>
      <Search />
      <Profile />
    </Header>
  );
};

