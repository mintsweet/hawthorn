import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { useIntl } from 'umi';
import { Button, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import * as Service from './service';
import * as GroupService from '../auth-group/service';

const { Option } = Select;

export default function AuthUser() {
  const { formatMessage } = useIntl();
  const table = useRef({ refreshData: () => ({}) });
  const [visible, setVisible] = useState(false);
  const [group, setGroup] = useState([]);

  const getGroup = async () => {
    const { data } = await GroupService.queryAuthGroup({ all: true });
    setGroup(data);
  };

  useEffect(() => {
    getGroup();
  }, []);

  const columns = [
    {
      title: formatMessage({ id: 'page.auth-user.username' }),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: formatMessage({ id: 'page.auth-user.role' }),
      key: 'role',
      render: (_: any, record: any) =>
        `${record.roleName}(${record.roleRemark})`,
    },
    {
      title: formatMessage({ id: 'page.auth-user.createdAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: any) => moment(val).format('YYYY-MM-DD HH:mm'),
    },
  ];

  const config = [
    {
      label: formatMessage({ id: 'page.auth-user.username' }),
      name: 'username',
      component: <Input />,
    },
    {
      label: formatMessage({ id: 'page.auth-user.role' }),
      name: 'role',
      component: (
        <Select>
          {group.map((i: any) => (
            <Option key={i._id} value={i._id}>
              {i.name}({i.remark})
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    await Service.createAuthUser(values);
    message.success(formatMessage({ id: 'page.auth-user.create.success.tip' }));
    setVisible(false);
    table.current.refreshData();
  };

  return (
    <BaseManagePage
      columns={columns}
      fetchData={Service.queryAuthUser}
      ref={table}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        {formatMessage({ id: 'page.auth-user.btn.create' })}
      </Button>
      <FormModal
        config={config}
        visible={visible}
        title={formatMessage({ id: 'page.auth-user.btn.create' })}
        onSubmit={handleSubmit}
      />
    </BaseManagePage>
  );
}
