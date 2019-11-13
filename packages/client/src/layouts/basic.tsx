import React, { PureComponent, createContext } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import Redirect from 'umi/redirect';
import { Layout } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { ConnectState, ConnectProps } from '@/models/connect';
import { SiderbarItemProps } from '@/models/user';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu, { SiderMenuWrapperProps } from '@/components/SiderMenu';
import { getFlatPaths } from '@/components/utils';
import Breadcrumb from '@/components/Breadcrumb';
import Exception from '@/components/Exception';
import routes from '../../config/router';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps, SiderMenuWrapperProps {
  user: any;
  loginStatus: 'OK' | 'FAILED';
};

/**
 * Get Breadcrumb Map
 * @param siderbar
 */
const getBreadcrumbNameMap = (siderbar: SiderbarItemProps[]) => {
  const routerMap: any = {};
  const flattenMenuData = (data: SiderbarItemProps[]) => {
    data.forEach((item: SiderbarItemProps) => {
      if (item.routes) {
        flattenMenuData(item.routes);
      }
      routerMap[item.path] = item;
    });
  }
  flattenMenuData(siderbar);
  return routerMap;
}

export const Context = createContext({});

class BasicLayout extends PureComponent<BasicLayoutProps> {
  componentDidMount() {
    const { loginStatus, user } = this.props;
    if (loginStatus === 'OK' && !user.id) {
      this.getData();
    }
  }

  getData() {
    this.props.dispatch({
      type: 'user/fetchUser',
    });
  }

  getPageTitle = (pathname: string, breadcrumbNameMap: any) => {
    const defaultTitle = 'Hawthorn';
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    if (!pathKey) {
      return defaultTitle;
    }

    const current = breadcrumbNameMap[pathKey];
    if (!current) {
      return defaultTitle;
    }

    return `${current.name} - ${defaultTitle}`;
  }

  handleToggleCollapsed = () => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !this.props.collapsed,
    });
  }

  handleClickUserMenu = (key: string) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
        payload: true,
      });
    }
  }

  render() {
    const { children, location, collapsed, siderbar, user, loginStatus } = this.props;
    const { pathname } = location;

    // Breadcrumb name map
    const breadcrumbNameMap = getBreadcrumbNameMap(siderbar);

    // Determine if the user is logged in
    const isLogin = loginStatus === 'OK';

    // Determine if there is routing authority
    const flatAuth = getFlatPaths(siderbar);
    const flatRoutes = getFlatPaths(routes);
    const noAuth = flatRoutes.includes(pathname) && !flatAuth.includes(pathname);
    const content = !noAuth ? children : <Exception type={403} />;

    const layout = (
      <Layout style={{ height: '100%' }}>
        <SiderMenu
          location={location}
          collapsed={collapsed}
          siderbar={siderbar}
        />
        <Layout>
          <Header style={{ padding: 0, background: '#fff', zIndex: 2, boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
            <GlobalHeader
              user={user}
              collapsed={collapsed}
              toggleCollapsed={this.handleToggleCollapsed}
              onClickMenu={this.handleClickUserMenu}
            />
          </Header>
          <Content>
            <Context.Provider value={{location, breadcrumbNameMap}}>
              {content}
            </Context.Provider>
          </Content>
        </Layout>
      </Layout>
    );

    return isLogin ? <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>{layout}</DocumentTitle> : <Redirect to="/user/login" />;
  }
}

export default connect(
  ({ global, login, user }: ConnectState) => ({
    collapsed: global.collapsed,
    loginStatus: login.status,
    user,
    siderbar: user.siderbar,
  })
)(BasicLayout);
