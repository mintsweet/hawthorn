import React, { Component } from 'react';
import { Button, Divider, Popconfirm, Input, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import * as AuthService from '@/services/auth';

export default class AuthUser extends Component {
  Table: any;

  state = {
    visible: false,
    modalType: 'add',
    updateObj: {
      _id: '',
    },
  };

  handleToggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      modalType: 'add',
      updateObj: {},
    });
  }

  handleSubmit = async (data: object) => {
    const { updateObj, modalType } = this.state;

    try {
      if (modalType === 'update') {
        await AuthService.updateUser(updateObj._id, data);
        message.success(formatMessage({ id: 'page.auth.user.action.update.message' }));
      } else {
        await AuthService.createUser(data);
        message.success(formatMessage({ id: 'page.auth.user.action.create.message' }));
      }
      this.Table.getData();
    } catch(err) {
      message.error(err.message);
    }
  }

  handleDelete = async (id: string) => {
    try {
      await AuthService.deleteUser(id);
      message.success(formatMessage({ id: 'page.auth.user.action.delete.message' }));
      this.Table.getData();
    } catch(err) {
      message.error(err.message);
    }
  }

  handleUpdate = (data: any) => {
    this.setState({
      visible: true,
      modalType: 'update',
      updateObj: data,
    });
  }

  render() {
    const { visible, modalType, updateObj } = this.state;

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
        title: formatMessage({ id: 'page.auth.user.columns.action' }),
        key: 'action',
        render: (_: any, record: any) => (
          <>
            <Button size="small" onClick={() => this.handleUpdate(record)}>
              {formatMessage({ id: 'page.auth.user.action.btns.update' })}
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={formatMessage({ id: 'page.auth.user.action.delete.confirm.message' })}
              onConfirm={() => this.handleDelete(record._id)}
            >
              <Button size="small" type="danger">
                {formatMessage({ id: 'page.auth.user.action.btns.delete' })}
              </Button>
            </Popconfirm>
          </>
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
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.password' }),
          props: 'password',
          component: <Input type="password" />
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.nickname' }),
          props: 'nickname',
          component: <Input />,
        },
        {
          label: formatMessage({ id: 'page.auth.user.form.modal.avatar' }),
          props: 'avatar',
          component: <Input />,
        },
      ],
    };

    return (
      <>
        <BaseManagePage
          columns={columns}
          fetchData={AuthService.getUsers}
          showSearch
          queryForm={queryForm}
          onRef={table => {
            this.Table = table;
          }}
        >
          <Button
            type="primary"
            onClick={this.handleToggleVisible}
          >{formatMessage({ id: 'page.auth.user.action.btns.add' })}</Button>
        </BaseManagePage>
        <FormModal
          config={formModalConfig}
          title={formatMessage({ id: 'page.auth.user.form.modal.title' })}
          visible={visible}
          data={updateObj}
          onCancel={this.handleToggleVisible}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
