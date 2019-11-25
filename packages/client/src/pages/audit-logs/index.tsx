import React from 'react';
import { Input, Select, DatePicker, Tag } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import PageHeader from '@/components/PageHeader';
import BaseManagePage from '@/components/BaseManagePage';
import * as AuditLogService from '@/services/audit-log';

const { Option } = Select;
const { RangePicker } = DatePicker;

const METHOD_MAP: any = {
  POST: 'green',
  DELETE: 'red',
  PUT: 'orange',
  GET: 'blue',
};

export default () => {
  const columns: any = [
    {
      title: formatMessage({ id: 'page.audit.log.columns.userName' }),
      dataIndex: 'userName',
      width: 120,
      align: 'center',
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.createdAt' }),
      dataIndex: 'createdAt',
      width: 180,
      align: 'center',
      render: (val: string) => moment(val).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.operationType' }),
      dataIndex: 'operationType',
      width: 180,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.operationContent' }),
      dataIndex: 'operationContent',
      width: 220,
      align: 'center',
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.ip' }),
      dataIndex: 'ip',
      width: 100,
      align: 'center',
      render: (val: string) => <Tag>{val}</Tag>,
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.url' }),
      dataIndex: 'url',
      width: 400,
      align: 'center',
    render: (val: string) => <Tag color="cyan">{val}</Tag>,
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.method' }),
      dataIndex: 'method',
      width: 120,
      align: 'center',
      render: (val: string) => <Tag color={METHOD_MAP[val]}>{val}</Tag>,
    },
    {
      title: formatMessage({ id: 'page.audit.log.columns.ua' }),
      dataIndex: 'ua',
      align: 'center',
    },
  ];

  const queryForm: any = {
    row: 1,
    form: [
      {
        label: formatMessage({ id: 'page.audit.log.query.form.userName' }),
        props: 'userName',
        component: <Input />,
      },
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
        label: formatMessage({ id: 'page.audit.log.query.form.operationType' }),
        props: 'operationType',
        component: <Input />,
      },
      {
        label: formatMessage({ id: 'page.audit.log.query.form.createdAt' }),
        props: 'createdAt',
        component: <RangePicker />,
      },
    ],
  };

  return (
    <PageHeader>
      <BaseManagePage
        scroll={{ x: 2600 }}
        columns={columns}
        fetchData={AuditLogService.getAuditLogs}
        showSearch
        queryForm={queryForm}
        dataFilterWidth={500}
      />
    </PageHeader>
  );
}
