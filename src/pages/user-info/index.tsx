import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Card, Row, Col, List, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import AuthStore from '@/store/auth';
//
import Password from './components/Password';
import styles from './index.less';

export default function UserInfo() {
  const user: any = AuthStore.useState('user') || {};
  const { formatMessage } = useIntl();
  const [modalType, setModalType] = useState('');

  const safety = [
    {
      title: formatMessage({ id: 'page.user-info.safety.password' }),
      description: (
        <>
          <CheckCircleFilled
            style={{ fontSize: 20, color: '#389e0d', marginRight: 6 }}
          />
          <span>********</span>
        </>
      ),
      actions: [
        <Button type="link" onClick={() => setModalType('password')}>
          {formatMessage({ id: 'page.user-info.safety.update' })}
        </Button>,
      ],
    },
  ];

  const renderModal = () => {
    switch (modalType) {
      case 'password':
        return <Password onCancel={() => setModalType('')} />;
      default:
        return null;
    }
  };

  return (
    <Card className={styles.main}>
      <div className={styles.block}>
        <div className={styles.title}>
          {formatMessage({ id: 'page.user-info.basic' })}
        </div>
        {Object.keys(user).map((k) => (
          <Row key={k} className={styles.row}>
            <Col className={styles.subTitle} span={3}>
              {formatMessage({ id: `page.user-info.basic.${k}` })}
            </Col>
            <Col span={10}>{user[k]}</Col>
          </Row>
        ))}
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          {formatMessage({ id: 'page.user-info.safety' })}
        </div>
        <List
          itemLayout="horizontal"
          dataSource={safety}
          renderItem={(item) => (
            <List.Item actions={item.actions.filter((action) => action)}>
              <div className={styles.item}>
                <div className={styles.subTitle}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
              </div>
            </List.Item>
          )}
        />
        {renderModal()}
      </div>
    </Card>
  );
}
