import React, { Component } from 'react';
import { Button, Input, message, Divider, Popconfirm } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import BaseManagePage from '@/components/BaseManagePage';
import FormModal from '@/components/FormModal';
import TriggerTree from '@/components/TriggerTree';
import * as AuthService from '@/services/auth';

const { TextArea } = Input;

export default class AuthGroup extends Component {
  Table: any;

  state = {
    treeData: [],
    visible: false,
    modalType: 'add',
    updateObj: {
      _id: '',
    },
  };

  componentDidMount() {
    this.getAuthTree();
  }

  async getAuthTree() {
    const { data } = await AuthService.getSystemTree();
    this.setState({
      treeData: data,
    });
  }

  handleToggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      modalType: 'add',
      updateObj: {},
    });
  }

  handleSubmit = async (data: any) => {
    const { updateObj, modalType } = this.state;

    try {
      if (modalType === 'update') {
        await AuthService.updateGroup(updateObj._id, data);
        message.success(formatMessage({ id: 'page.auth.group.action.update.message' }));
      } else {
        await AuthService.createGroup(data);
        message.success(formatMessage({ id: 'page.auth.group.action.create.message' }));
      }
      this.Table.getData();
    } catch(err) {
      message.error(err.message);
    }
  }

  handleDelete = async (id: string) => {
    try {
      await AuthService.deleteGroup(id);
      message.success(formatMessage({ id: 'page.auth.group.action.delete.message' }));
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
    const { treeData, visible, modalType, updateObj } = this.state;

    const columns: any = [
      {
        title: formatMessage({ id: 'page.auth.group.columns.name' }),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: formatMessage({ id: 'page.auth.group.columns.remark' }),
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: formatMessage({ id: 'page.auth.group.columns.action' }),
        key: 'action',
        render: (_: any, record: any) => (
          <>
            <Button size="small" onClick={() => this.handleUpdate(record)}>
              {formatMessage({ id: 'page.auth.group.action.btns.config' })}
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={formatMessage({ id: 'page.auth.group.action.delete.confirm.message' })}
              onConfirm={() => this.handleDelete(record._id)}
            >
              <Button size="small" type="danger">
                {formatMessage({ id: 'page.auth.group.action.btns.delete' })}
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];

    const config: any = {
      row: 1,
      form: [
        {
          label: formatMessage({ id: 'page.auth.group.form.modal.name' }),
          props: 'name',
          component: <Input disabled={modalType === 'update'} />,
        },
        {
          label: formatMessage({ id: 'page.auth.group.form.modal.remark' }),
          props: 'remark',
          component: <TextArea rows={3} />
        },
        {
          label: formatMessage({ id: 'page.auth.group.form.modal.permissions' }),
          props: 'permissions',
          component: <TriggerTree data={treeData} />
        },
      ],
    };

    return (
      <>
        <BaseManagePage
          columns={columns}
          fetchData={AuthService.getGroups}
          onRef={table => {
            this.Table = table;
          }}
        >
          <Button
            type="primary"
            onClick={this.handleToggleVisible}
          >{formatMessage({ id: 'page.auth.group.action.btns.add' })}</Button>
        </BaseManagePage>
        <FormModal
          config={config}
          title={formatMessage({ id: 'page.auth.group.form.modal.title' })}
          visible={visible}
          data={updateObj}
          onCancel={this.handleToggleVisible}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
