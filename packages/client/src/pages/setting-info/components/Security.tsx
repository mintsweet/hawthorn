import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { List, Button } from 'antd';

const list = [
  {
    title: formatMessage({ id: 'page.setting.info.security.password.title' }),
    description: formatMessage({ id: 'page.setting.info.security.password.description' }),
    actions: [
      <Button type="link">
        {formatMessage({ id: 'page.setting.info.security.actions.update' })}
      </Button>,
    ],
  },
];

export default class Security extends Component {
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  }
}
