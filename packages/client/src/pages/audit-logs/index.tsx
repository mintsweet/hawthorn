import React from 'react';
import { Input, Select, DatePicker } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import BaseManagePage from '@/components/BaseManagePage';
import * as AuditLogService from '@/services/audit-log';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default () => {
  const columns: any = [
    {
      title: formatMessage({ id: 'page.audit.log.columns.ip' }),
      dataIndex: 'ip',
      width: 100,
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.url' }),
      dataIndex: 'url',
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.method' }),
      dataIndex: 'method',
      width: 60,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.userId' }),
      dataIndex: 'userId',
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.userName' }),
      dataIndex: 'userName',
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.recordTime' }),
      dataIndex: 'recordTime',
      width: 120,
      align: 'center',
      render: (recordTime: string) => <span>{moment(recordTime).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.operationType' }),
      dataIndex: 'operationType',
      width: 80,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.operationContent' }),
      dataIndex: 'operationContent',
      width: 100,
      align: 'center',
    },
  ];

  const queryForm: any = {
    row: 1,
    form: [
      {
        label: formatMessage({ id: 'page.audit.log.query.form.ip' }),
        props: 'ip',
        component: <Input />,
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.url' }),
        props: 'url',
        component: <Input />,
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.method' }),
        props: 'method',
        component: (
          <Select>
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="PATCH">PATCH</Option>
            <Option value="DELETE">DELETE</Option>
          </Select>
        ),
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.userId' }),
        props: 'userId',
        component: <Input />,
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.userName' }),
        props: 'userName',
        component: <Input />,
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.recordTime' }),
        props: 'recordTime',
        component: <RangePicker />,
      },
    ],
  };

  return (
    <BaseManagePage
      columns={columns}
      fetchData={AuditLogService.getAuditLogs}
      showSearch
      queryForm={queryForm}
    />
  );
}
