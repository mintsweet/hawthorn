import React, { useState, useEffect, useRef } from 'react';
import { sortBy } from 'lodash';
import moment from 'moment';
import { useIntl } from 'umi';
import { Button, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import TriggerTree from '@/components/TriggerTree';
import * as Service from './service';

const initUpdObj = {
  _id: '',
  name: '',
  remark: '',
  permissions: {
    checked: [],
    halfChecked: [],
  },
};

export default function AuthGroup() {
  const { formatMessage } = useIntl();
  const table = useRef({ refreshData: () => ({}) });
  const [visible, setVisible] = useState(false);
  const [rbac, setRbac] = useState([]);
  const [updObj, setUpdObj] = useState(initUpdObj);
  const [modalType, setModalType] = useState('create');

  const columns = [
    {
      title: formatMessage({ id: 'page.auth-group.name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: formatMessage({ id: 'page.auth-group.remark' }),
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: formatMessage({ id: 'page.auth-group.createdAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: any) => moment(val).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: formatMessage({ id: 'page.auth-group.updatedAt' }),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (val: any) => moment(val).format('YYYY-MM-DD HH:mm'),
    },
  ];

  const config = [
    {
      label: formatMessage({ id: 'page.auth-group.name' }),
      name: 'name',
      component: <Input />,
      required: formatMessage({ id: 'page.auth-group.name.required' }),
    },
    {
      label: formatMessage({ id: 'page.auth-group.remark' }),
      name: 'remark',
      component: <Input />,
      required: formatMessage({ id: 'page.auth-group.remark.required' }),
    },
    {
      label: formatMessage({ id: 'page.auth-group.permissions' }),
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
    if (modalType === 'update') {
      await Service.updateAuthGroup(updObj._id, values);
      message.success(
        formatMessage({ id: 'page.auth-group.update.successTip' }),
      );
    } else {
      await Service.createAuthGroup(values);
      message.success(
        formatMessage({ id: 'page.auth-group.create.successTip' }),
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
    await Service.deleteAuthGroup(_id);
    message.success(formatMessage({ id: 'page.auth-group.delete.successTip' }));
    table.current.refreshData();
  };

  return (
    <BaseManagePage
      ref={table}
      columns={columns}
      fetchData={Service.queryAuthGroup}
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
          { id: 'page.auth-group.modal.title' },
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
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </BaseManagePage>
  );
}
