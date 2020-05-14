import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseManagePage from '@/components/BaseManagePage';
import * as Service from './service';

export default function AuthGroup() {
  const intl = useIntl();
  const columns = [
    {
      title: <FormattedMessage id="page.auth-group.columns.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="page.auth-group.columns.remark" />,
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <BaseManagePage columns={columns} fetchData={Service.queryAuthGroup}>
      <Button type="primary" icon={<PlusOutlined />}>
        {intl.formatMessage({ id: 'page.auth-group.btn.create' })}
      </Button>
    </BaseManagePage>
  );
}
