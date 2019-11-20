import React, { Component } from 'react';
import { Button, Divider, Popconfirm, Input, Select, Tag, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import PageHeader from '@/components/PageHeader';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import Authorized from '@/components/Authorized';
import * as AuthService from '@/services/auth';

const { Option } = Select;

export default class AuthUser extends Component {
  Table: any;

  state = {
    visible: false,
    modalType: 'add',
    updateObj: {
      _id: '',
    },
    groups: [],
  };

  componentDidMount() {
    this.getAuthGroup();
  }

  async getAuthGroup() {
    const { data } = await AuthService.searchGroup();
    this.setState({
      groups: data,
    });
  }

  handleToggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      modalType: 'add',
      updateObj: {},
    });
  }

  handleSubmit = async (data: object) => {
    const { updateObj, modalType } = this.state;

    if (modalType === 'update') {
      await AuthService.updateUser(updateObj._id, data);
      message.success(formatMessage({ id: 'page.auth.user.action.update.message' }));
    } else {
      await AuthService.createUser(data);
      message.success(formatMessage({ id: 'page.auth.user.action.create.message' }));
    }
    this.Table.getData();
  }

  handleDelete = async (id: string) => {
    await AuthService.deleteUser(id);
    message.success(formatMessage({ id: 'page.auth.user.action.delete.message' }));
    this.Table.getData();
  }

  handleUpdate = (data: any) => {
    this.setState({
      visible: true,
      modalType: 'update',
      updateObj: data,
    });
  }

  render() {
    const { visible, modalType, updateObj, groups } = this.state;

    const columns: any = [
      {
        title: formatMessage({ id: 'page.auth.user.columns.username' }),
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: formatMessage({ id: 'page.auth.user.columns.nickname' }),
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: formatMessage({ id: 'page.auth.user.columns.role' }),
        dataIndex: 'roleName',
        key: 'roleName',
        render: (roleName: string) => <Tag>{roleName}</Tag>,
      },
      {
        title: formatMessage({ id: 'page.auth.user.columns.action' }),
        key: 'action',
        render: (_: any, record: any) => (
          <Authorized has={['/auth/user/update', '/auth/user/delete']}>
            <Authorized has="/auth/user/update">
              <Button size="small" onClick={() => this.handleUpdate(record)}>
                {formatMessage({ id: 'page.auth.user.action.btns.update' })}
              </Button>
            </Authorized>
            <Divider type="vertical" />
            <Authorized has="/auth/user/delete">
              <Popconfirm
                title={formatMessage({ id: 'page.auth.user.action.delete.confirm.message' })}
                onConfirm={() => this.handleDelete(record._id)}
              >
                <Button size="small" type="danger">
                  {formatMessage({ id: 'page.auth.user.action.btns.delete' })}
                </Button>
              </Popconfirm>
            </Authorized>
          </Authorized>
        ),
      },
    ];

    const queryForm: any = {
      row: 1,
      form: [
        {
          label: formatMessage({ id: 'page.auth.user.query.form.username' }),
          props: 'username',
          component: <Input />,
        },
        {
          label: formatMessage({ id: 'page.auth.user.query.form.nickname' }),
          props: 'nickname',
          component: <Input />,
        },
      ],
    };

    const formModalConfig: any = {
      row: 1,
      form: [
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.username' }),
          props: 'username',
          component: <Input disabled={modalType === 'update'} />,
          required: true,
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.password' }),
          props: 'password',
          component: <Input type="password" />,
          required: true,
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.nickname' }),
          props: 'nickname',
          component: <Input />,
          required: true,
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.role' }),
          props: 'role',
          component: (
            <Select>
              {groups.map((item: any) => (
                <Option key={item._id} value={item._id}>{item.name}</Option>
              ))}
            </Select>
          ),
          required: true,
        },
      ],
    };

    return (
      <PageHeader>
        <BaseManagePage
          columns={columns}
          fetchData={AuthService.getUsers}
          showSearch
          queryForm={queryForm}
          showColumnFilter
          onRef={table => {
            this.Table = table;
          }}
        >
          <Authorized has="/auth/user/create">
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={this.handleToggleVisible}
            >
              {formatMessage({ id: 'page.auth.user.action.btns.add' })}
            </Button>
          </Authorized>
        </BaseManagePage>
        <FormModal
          config={formModalConfig}
          title={formatMessage({ id: 'page.auth.user.form.modal.title' })}
          visible={visible}
          data={updateObj}
          onCancel={this.handleToggleVisible}
          onSubmit={this.handleSubmit}
        />
      </PageHeader>
    );
  }
}
