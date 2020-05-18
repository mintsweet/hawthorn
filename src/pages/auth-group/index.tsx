import React, { useState, useEffect, useRef } from 'react';
import { sortBy } from 'lodash';
import { FormattedMessage, useIntl } from 'umi';
import { Button, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import TriggerTree from '@/components/TriggerTree';
import * as Service from './service';

export default function AuthGroup() {
  const intl = useIntl();
  const table = useRef({ refreshData: () => ({}) });
  const [visible, setVisible] = useState(false);
  const [rbac, setRbac] = useState([]);

  const columns = [
    {
      title: <FormattedMessage id="page.auth-group.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="page.auth-group.remark" />,
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const config = [
    {
      label: <FormattedMessage id="page.auth-group.name" />,
      name: 'name',
      component: <Input />,
      required: <FormattedMessage id="page.auth-group.name.required" />,
    },
    {
      label: <FormattedMessage id="page.auth-group.remark" />,
      name: 'remark',
      component: <Input />,
      required: <FormattedMessage id="page.auth-group.remark.required" />,
    },
    {
      label: <FormattedMessage id="page.auth-group.permissions" />,
      name: 'permissions',
      component: <TriggerTree data={rbac} />,
    },
  ];

  const getData = async () => {
    const { data } = await Service.querySystemTree();

    const sortOnRbac = (data: any) => {
      let result: any = [];

      data.forEach((item: any) => {
        if (item.routes) {
          item.routes = sortOnRbac(item.routes);
        }

        result.push({
          title: item.name,
          key: item.path,
          children: item.routes || [],
        });
      });

      return result;
    };

    setRbac(sortOnRbac(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values: any) => {
    await Service.createAuthGroup({
      ...values,
      permissions: sortBy([
        ...values.permissions.checked,
        ...values.permissions.halfChecked,
      ]),
    });
    message.success(
      intl.formatMessage({ id: 'page.auth-gourp.create.success.tip' }),
    );
    setVisible(false);
    table.current.refreshData();
  };

  return (
    <BaseManagePage
      columns={columns}
      fetchData={Service.queryAuthGroup}
      ref={table}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        {intl.formatMessage({ id: 'page.auth-group.action.create' })}
      </Button>
      <FormModal
        config={config}
        visible={visible}
        title={intl.formatMessage({ id: 'page.auth-group.action.create' })}
        onSubmit={handleSubmit}
      />
    </BaseManagePage>
  );
}
