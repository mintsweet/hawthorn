import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import Exception from '@/components/Exception';
import { SiderMenuWrapperProps } from './components/SiderMenu';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';
import routes from '../../config/router';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps, SiderMenuWrapperProps {
  user: any;
};

/**
 * Serialized routing menu configuration
 * [{ path: '/xxx', routes: [{ path: '/bbb' }] }, { path: '/ccc' }] => ['/xxx', '/xxx/bbb', '/ccc']
 * @param data
 */
const getFlatPaths = (data: any[]) => {
  let keys: Array<string> = [];
  data.forEach(item => {
    if (!item.redirect) {
      keys.push(item.path);
    }

    if (item.routes) {
      keys = keys.concat(getFlatPaths(item.routes));
    }
  });
  return keys;
}

class BasicLayout extends Component<BasicLayoutProps> {
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.dispatch({
      type: 'global/fetchSiderbar',
    });

    this.props.dispatch({
      type: 'global/fetchUser',
    });
  }

  handleToggleCollapsed = () => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !this.props.collapsed,
    });
  }

  render() {
    const { children, location, collapsed, siderbar, user } = this.props;
    const { pathname } = location;

    const flatAuth = getFlatPaths(siderbar);
    const flatRoutes = getFlatPaths(routes);
    // Determine if there is routing authority
    const noAuth = flatRoutes.includes(pathname) && !flatAuth.includes(pathname);
    const content = !noAuth ? children : <Exception type={403} />;

    return (
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
            />
          </Header>
          <Content style={{ margin: '24px 16px' }}>
            {content}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  ({ global }: ConnectState) => ({
    collapsed: global.collapsed,
    siderbar: global.siderbar,
    user: global.user,
  })
)(BasicLayout);
