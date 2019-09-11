import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import styles from './index.less';

interface GlobalHeaderProps extends ConnectProps {
  collapsed: boolean;
};

class GlobalHeader extends Component<GlobalHeaderProps> {
  handleToggleCollapsed = () => {
    const { collapsed, dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
  }

  render() {
    const { collapsed } = this.props;

    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handleToggleCollapsed}
        />
      </div>
    );
  }
}

export default connect(
  ({ global }: ConnectState) => ({
    collapsed: global.collapsed,
  })
)(GlobalHeader);
