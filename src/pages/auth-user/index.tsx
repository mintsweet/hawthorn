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

const initUpdObj = {
  _id: '',
  username: '',
  role: '',
};

export default function AuthUser() {
  const { formatMessage } = useIntl();
  const table = useRef({ refreshData: () => ({}) });
  const [visible, setVisible] = useState(false);
  const [group, setGroup] = useState([]);
  const [updObj, setUpdObj] = useState(initUpdObj);
  const [modalType, setModalType] = useState('create');

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
    {
      title: formatMessage({ id: 'page.auth-user.updatedAt' }),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (val: any) => moment(val).format('YYYY-MM-DD HH:mm'),
    },
  ];

  const config = [
    {
      label: formatMessage({ id: 'page.auth-user.username' }),
      name: 'username',
      component: <Input />,
      required: formatMessage({ id: 'page.auth-user.username.required' }),
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
      required: formatMessage({ id: 'page.auth-user.role.required' }),
    },
  ];

  const handleSubmit = async (values: any) => {
    if (modalType === 'update') {
      await Service.updateAuthUser(updObj._id, values);
      message.success(
        formatMessage({ id: 'page.auth-user.update.successTip' }),
      );
    } else {
      await Service.createAuthUser(values);
      message.success(
        formatMessage({ id: 'page.auth-user.create.successTip' }),
      );
    }
    setUpdObj(initUpdObj);
    setVisible(false);
    table.current.refreshData();
  };

  const handleUpdate = (record: any) => {
    setModalType('update');
    setUpdObj(record);
    setVisible(true);
  };

  const handleDelete = async ({ _id }: any) => {
    await Service.deleteAuthUser(_id);
    message.success(formatMessage({ id: 'page.auth-user.delete.successTip' }));
    table.current.refreshData();
  };

  return (
    <BaseManagePage
      ref={table}
      columns={columns}
      fetchData={Service.queryAuthUser}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setModalType('create');
          setUpdObj(initUpdObj);
          setVisible(true);
        }}
      >
        {formatMessage({ id: 'component.base-manage-page.operate.create' })}
      </Button>
      <FormModal
        initData={updObj}
        config={config}
        visible={visible}
        title={formatMessage(
          { id: 'page.auth-user.modal.title' },
          {
            type:
              modalType === 'update'
                ? formatMessage({
                    id: 'component.base-manage-page.operate.update',
                  })
                : formatMessage({
                    id: 'component.base-manage-page.operate.create',
                  }),
          },
        )}
        onSubmit={handleSubmit}
        onCancel={() => setVisible(false)}
      />
    </BaseManagePage>
  );
}
