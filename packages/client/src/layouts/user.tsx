import React from 'react';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import Link from 'umi/link'
import { formatMessage } from 'umi-plugin-locale';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './user.less';

const UserLayout: React.SFC = props => {
  const { children } = props;

  const links = [
    {
      key: 'help',
      title: formatMessage({ id: 'layout.user.link.help' }),
      href: 'https://github.com/mintsweet/hawthorn',
      blankTarget: true,
    },
    {
      key: 'home',
      title: formatMessage({ id: 'layout.user.link.home' }),
      href: 'https://github.com/mintsweet/hawthorn',
      blankTarget: true,
    },
  ];

  const copyright = (
    <>
      Copyright <Icon type="copyright" /> 青湛 GitHub(mintsweet)
    </>
  );

  return (
    <DocumentTitle title="Hawthorn">
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <Link to="/" className={styles.title}>
              {/* <img alt="logo" src={logo} /> */}
              <span>Hawthorn</span>
            </Link>
            <div className={styles.desc}>
              {formatMessage({ id: 'layout.user.desc' })}
            </div>
          </div>
          <div className={styles.main}>
            {children}
          </div>
        </div>
        <GlobalFooter
          links={links}
          copyright={copyright}
        />
      </div>
    </DocumentTitle>
  );
}

export default UserLayout;
