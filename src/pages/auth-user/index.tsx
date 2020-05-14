import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseManagePage from '@/components/BaseManagePage';
import * as Service from './service';

export default function AuthUser() {
  const intl = useIntl();
  const columns = [
    {
      title: <FormattedMessage id="page.auth-user.columns.username" />,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <FormattedMessage id="page.auth-user.columns.role" />,
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <BaseManagePage columns={columns} fetchData={Service.queryAuthUser}>
      <Button type="primary" icon={<PlusOutlined />}>
        {intl.formatMessage({ id: 'page.auth-user.btn.create' })}
      </Button>
    </BaseManagePage>
  );
}
