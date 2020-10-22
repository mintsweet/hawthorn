import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'umi';
import { Input, Divider, Card } from 'antd';
import styles from './ClientLayout.less';

interface Props {
  children: React.ReactNode;
}

const { Search } = Input;

export default function ClientLayout({ children }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.body.onclick = () => setActive(false);
  }, []);

  return [
    <header key="header" className={styles.header}>
      <div className={styles.layout}>
        <div className={styles.logo}>
          <Link to="/client">薄荷糖社区</Link>
          <Search className={styles.search} />
        </div>
        <div className={styles.info}>
          <Link to="/client/signup">注册</Link>
          <Divider type="vertical" />
          <Link to="/client/signin">登录</Link>
        </div>
        <div className={styles.mobile} onClick={() => setActive(true)}>
          <div
            className={classNames(styles.navbar, {
              [styles.active]: active,
            })}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={classNames(styles.content, {
              [styles.active]: active,
            })}
          >
            <ul className="menu">
              <li>
                <Link to="">首页</Link>
              </li>
              <li>
                <Link to="">分享</Link>
              </li>
              <li>
                <Link to="">问答</Link>
              </li>
              <li>
                <Link to="">招聘</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>,
    <main key="main" className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
        <div className={styles.aside}>
          <Card size="small" title="无人回复的话题">
            <p>a</p>
          </Card>
          <Card style={{ marginTop: 20 }} size="small" title="积分榜">
            <p>a</p>
          </Card>
        </div>
      </div>
    </main>,
    <footer key="footer" className={styles.footer}>
      <div className={styles.layout}>
        <div className={styles.links}>
          <a href="https://github.com/mintsweet/practice" target="_blank">
            本站源码
          </a>
          <Divider type="vertical" />
          <a
            href="https://github.com/mintsweet/practice/issues"
            target="_blank"
          >
            反馈建议
          </a>
        </div>
        <div className={styles.copyright}>
          <p>&copy; 2020 All Rights Reserved</p>
        </div>
      </div>
    </footer>,
  ];
}
