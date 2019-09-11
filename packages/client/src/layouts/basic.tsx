import React, { Component } from 'react';
import { Layout } from 'antd';
import GlobalHeader from './components/GlobalHeader';
import SiderMenu from './components/SiderMenu';

const { Header, Content, Footer } = Layout;

export default class BasicLayout extends Component {
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
