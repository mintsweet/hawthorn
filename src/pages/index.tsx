import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary">按钮</Button>
    </div>
  );
}
