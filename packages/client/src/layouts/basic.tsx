import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { ConnectProps } from '@/models/connect';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';

const { Header, Content } = Layout;

interface BasicLayoutProps extends ConnectProps {
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
    return (
      <Layout style={{ height: '100%' }}>
        <SiderMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(BasicLayout);
