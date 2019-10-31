import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Layout } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import Exception from '@/components/Exception';
import { SiderMenuWrapperProps } from './components/SiderMenu';
import { getFlatPaths } from './components/SiderMenu/utils';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';
import routes from '../../config/router';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps, SiderMenuWrapperProps {
  user: any;
  loginStatus: 'OK' | 'FAILED';
};

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

    this.props.dispatch({
      type: 'user/fetchSiderbar',
    });
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
          <Header style={{ padding: 0, background: '#fff' }}>
            <GlobalHeader
              user={user}
              collapsed={collapsed}
              toggleCollapsed={this.handleToggleCollapsed}
              onClickMenu={this.handleClickUserMenu}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: '24px 16px', background: '#fff' }}>
            {content}
          </Content>
        </Layout>
      </Layout>
    );

    return isLogin ? layout : <Redirect to="/user/login" />;
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
