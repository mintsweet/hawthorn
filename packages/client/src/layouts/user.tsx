import React from 'react';
import styles from './user.less';

const UserLayout: React.SFC = props => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>

      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
