import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import PageHeader from '@/components/PageHeader';
import Base from './components/Base';
import Security from './components/Security';
import styles from './index.less';

const { Item: MenuItem } = Menu;

export default class SettingInfo extends Component {
  state = {
    selectKey: 'base',
  };

  handleSelectKey = ({ key }: ClickParam) => {
    this.setState({
      selectKey: key,
    });
  }

  render() {
    const { selectKey } = this.state;

    const menuList = [
      {
        key: 'base',
        title: formatMessage({ id: 'page.setting.info.menu.base' }),
        render: (props: any) => <Base {...props} />,
      },
      {
        key: 'security',
        title: formatMessage({ id: 'page.setting.info.menu.security' }),
        render: (props: any) => <Security {...props} />,
      },
    ];

    const current: any = menuList.find(item => item.key === selectKey);

    return (
      <PageHeader hiddenBreadcrumb>
        <div className={styles.wrapper}>
          <div className={styles.menu}>
            <Menu
              mode="inline"
              selectedKeys={[selectKey]}
              onClick={this.handleSelectKey}
            >
              {menuList.map(item => (
                <MenuItem key={item.key}>{item.title}</MenuItem>
              ))}
            </Menu>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{current.title}</div>
            {current.render()}
          </div>
        </div>
      </PageHeader>
    );
  }
}
