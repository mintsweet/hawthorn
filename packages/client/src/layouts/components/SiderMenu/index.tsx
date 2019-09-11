import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { ConnectState } from '@/models/connect';
import styles from './index.less';

const { Sider } = Layout;

interface SiderMenuProps {
  collapsed: boolean;
};

class SiderMenu extends Component<SiderMenuProps> {
  render() {
    const { collapsed } = this.props;

    return (
      <Sider
        width={256}
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}


export default connect(
  ({ global }: ConnectState) => ({
    collapsed: global.collapsed,
  })
)(SiderMenu);
