import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Button } from 'antd';
import BaseManagePage from '@/components/BaseManagePage';
import { formatDate } from '@/utils/utils';
import Detail, {
  renderUrl,
  renderMethod,
  renderCode,
} from './components/Detail';
import * as Service from './service';

export default function AuditLog() {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const columns = [
    {
      title: formatMessage({ id: 'page.audit-log.createdAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      align: 'center' as 'center',
      render: (val: any) => formatDate(val),
    },
    {
      title: formatMessage({ id: 'page.audit-log.ip' }),
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
      align: 'center' as 'center',
    },
    {
      title: formatMessage({ id: 'page.audit-log.username' }),
      dataIndex: 'username',
      key: 'username',
      width: 150,
      align: 'center' as 'center',
    },
    {
      title: formatMessage({ id: 'page.audit-log.url' }),
      dataIndex: 'url',
      key: 'url',
      align: 'center' as 'center',
      render: (val: string) => renderUrl(val),
    },
    {
      title: formatMessage({ id: 'page.audit-log.method' }),
      dataIndex: 'method',
      key: 'method',
      width: 100,
      align: 'center' as 'center',
      render: (val: string) => renderMethod(val),
    },
    {
      title: formatMessage({ id: 'page.audit-log.code' }),
      dataIndex: 'code',
      key: 'code',
      width: 100,
      align: 'center' as 'center',
      render: (val: number) => renderCode(val),
    },
    {
      title: formatMessage({ id: 'page.audit-log.operate' }),
      key: 'operate',
      width: 200,
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => {
            setVisible(true);
            setDetail(record);
          }}
        >
          {formatMessage({ id: 'page.audit-log.operate.detail' })}
        </Button>
      ),
    },
  ];

  return (
    <BaseManagePage columns={columns} fetchData={Service.queryAuditLog}>
      <Detail
        visible={visible}
        data={detail}
        onCancel={() => setVisible(false)}
      />
    </BaseManagePage>
  );
}
