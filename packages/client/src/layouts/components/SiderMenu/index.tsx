import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { ConnectState } from '@/models/connect';
import { SiderbarItemProps } from '@/models/global';
import styles from './index.less';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

interface SiderMenuProps {
  collapsed: boolean;
  siderbar: Array<any>;
};

class SiderMenu extends Component<SiderMenuProps> {
  getSubMenuOrItem = (item: SiderbarItemProps) => {
    if (item.routes && item.routes.some((child: SiderbarItemProps) => child.name)) {
      return (
        <SubMenu
          title={item.icon ? (
            <span>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </span>
          ) : (
            <span>{item.name}</span>
          )}
          key={item.path}
        >
          {this.getNavMenuItems(item.routes)}
        </SubMenu>
      );
    }
    return <MenuItem key={item.path}>{item.name}</MenuItem>;
  }

  getNavMenuItems = (data: SiderbarItemProps[]) => {
    if (!data) {
      return [];
    }
    return data
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(Boolean);
  }

  render() {
    const { collapsed, siderbar } = this.props;

    console.log(siderbar);

    return (
      <Sider
        width={256}
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
        >
          {this.getNavMenuItems(siderbar)}
        </Menu>
      </Sider>
    );
  }
}


export default connect(
  ({ global }: ConnectState) => ({
    collapsed: global.collapsed,
    siderbar: global.siderbar,
  })
)(SiderMenu);
