import React, { Component } from 'react';
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd'
import pathToRegexp from 'path-to-regexp';
import { SiderbarItemProps } from '@/models/user';
import { urlToList } from '@/utils/url';
import { SiderMenuWrapperProps } from './index';
import styles from './index.less';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

export interface SiderMenuProps extends SiderMenuWrapperProps {
  flatMenuKeys: string[];
};

interface SiderMenuState {
  pathname: string;
  openKeys: string[];
};

/**
 * Get menu select key
 * @param flatMenuKeys
 * @param path
 */
const getMenuMatches = (flatMenuKeys: string[], path: string) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

/**
 * Get menu children
 * @param props
 */
const getDefaultCollapsedSubMenus = (props: SiderMenuProps) => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;

  return urlToList(pathname)
    .map(path => getMenuMatches(flatMenuKeys, path)[0])
    .filter(Boolean);
}

class SiderMenu extends Component<SiderMenuProps, SiderMenuState> {
  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      pathname: '',
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  static getDerivedStateFromProps(props: SiderMenuProps, state: SiderMenuState) {
    const { pathname } = state;
    if (props.flatMenuKeys.length !== 0 && props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
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
    return <MenuItem key={item.path}>{this.getMenuItemPath(item)}</MenuItem>;
  }

  getMenuItemPath = (item: SiderbarItemProps) => {
    const { name, icon, path, target } = item;

    if (/^https?:\/\//.test(path)) {
      return (
        <a href={path} target={target}>
          {icon && <Icon type={icon} />}
          <span>{name}</span>
        </a>
      );
    }

    return (
      <Link to={path} target={target}>
        {icon && <Icon type={icon} />}
        <span>{name}</span>
      </Link>
    );
  }

  getSelectedMenuKeys = (pathname: string) => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname)
      .map(path => {
        const arr = getMenuMatches(flatMenuKeys, path);
        return arr[arr.length - 1];
      });
  };

  isMainMenu = (key: string) => {
    const { siderbar } = this.props;
    return siderbar.some(item => {
      if (key) {
        return item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = (openKeys: string[]) => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys[openKeys.length - 1]] : [...openKeys],
    });
  };

  render() {
    const { openKeys } = this.state;
    const {
      collapsed,
      siderbar,
      location: { pathname },
    } = this.props;

    let selectedKeys = this.getSelectedMenuKeys(pathname);

    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }

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
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
          {...props}
        >
          {this.getNavMenuItems(siderbar)}
        </Menu>
      </Sider>
    );
  }
}


export default SiderMenu;
