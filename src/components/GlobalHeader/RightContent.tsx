import React from 'react';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

export default function RightContent() {
  return (
    <div className={styles.right}>
      <AvatarDropdown />
    </div>
  );
}
