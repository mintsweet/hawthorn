import React from 'react';
import { Dropdown, Menu, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import AuthStore from '@/store/auth';
import styles from './index.less';

const { Item: MenuItem } = Menu;

export default function AvatarDropdown() {
  const user = AuthStore.useState('user');

  const handleMenuClick = ({ key }: ClickParam) => {
    if (key === 'logout') {
      AuthStore.dispatch('logout');
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
      <MenuItem key="logout">
        <LogoutOutlined />
        退出登录
      </MenuItem>
    </Menu>
  );

  return user && user.username ? (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className={styles.action}>
        <span>{user.username}</span>
      </span>
    </Dropdown>
  ) : (
    <span className={styles.action}>
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    </span>
  );
}
