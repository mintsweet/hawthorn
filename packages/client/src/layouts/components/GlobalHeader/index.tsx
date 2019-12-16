import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Avatar, Spin, Tooltip } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import styles from './index.less';

interface GlobalHeaderProps {
  collapsed: boolean;
  user: any;
  toggleCollapsed: () => void;
  onClickMenu: (key: string) => void;
};

class GlobalHeader extends Component<GlobalHeaderProps> {
  render() {
    const { collapsed, user, toggleCollapsed, onClickMenu } = this.props;

    const menu = (
      <Menu onClick={param => onClickMenu(param.key)}>
        <Menu.Item key="setting-info">
          <Icon type="setting" />
          {formatMessage({ id: 'component.globalHeader.dropMenu.accountSetting' })}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          {formatMessage({ id: 'component.globalHeader.dropMenu.logout' })}
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleCollapsed}
        />
        <div className={styles.right}>
          <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
            <a
              target="_blank"
              href="https://github.com/mintsweet/hawthorn"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          {(user.nickname || user.username) ? (
            <Dropdown overlay={menu}>
              <span className={styles.action}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  icon="user"
                  src={user.avatar}
                />
                <span className={styles.name}>{user.nickname || user.username}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
          <SelectLang className={styles.action} />
        </div>
      </div>
    );
  }
}

export default GlobalHeader;
