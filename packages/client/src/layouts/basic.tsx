import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import { SiderMenuWrapperProps } from './components/SiderMenu';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps, SiderMenuWrapperProps {
  user: any;
};

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
            {children}
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
