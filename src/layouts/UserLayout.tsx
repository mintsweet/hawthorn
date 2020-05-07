import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Link, FormattedMessage } from 'umi';
import styles from './UserLayout.less';

interface Props {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>
          <Link to="/" className={styles.title}>
            <span>
              <FormattedMessage id="site.name" />
            </span>
          </Link>
          <div className={styles.desc}>
            <FormattedMessage id="layout.user.desc" />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.links}>
          <a href="https://github.com/mintsweet/hawthorn" target="_blank">
            <FormattedMessage id="layout.footer.help" />
          </a>
          <a href="https://github.com/mintsweet/hawthorn" target="_blank">
            <FormattedMessage id="layout.footer.home" />
          </a>
        </div>
        <div className={styles.copyright}>
          Copyright <CopyrightOutlined /> 青湛 GitHub(mintsweet)
        </div>
      </footer>
    </div>
  );
}
