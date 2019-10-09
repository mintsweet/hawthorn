import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import { SiderMenuWrapperProps } from './components/SiderMenu';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps, SiderMenuWrapperProps {
};

class BasicLayout extends Component<BasicLayoutProps> {
  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.props.dispatch({
      type: 'global/fetchSiderbar',
    });
  }

  render() {
    const { children, location, collapsed, siderbar } = this.props;

    return (
      <Layout style={{ height: '100%' }}>
        <SiderMenu
          location={location}
          collapsed={collapsed}
          siderbar={siderbar}
        />
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }}>
            <GlobalHeader />
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
  })
)(BasicLayout);
