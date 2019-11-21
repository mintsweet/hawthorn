import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-locale';
import { List, Button, Input, message } from 'antd';
import { ConnectProps } from '@/models/connect';
import FormModal from '@/components/FormModal';
import * as AuthService from '@/services/auth';

interface SecurityProps extends ConnectProps {}

class Security extends Component<SecurityProps> {
  Form: any;

  state = {
    updatePassVisible: false,
  }

  handleToggleUpdatePass = () => {
    this.setState({
      updatePassVisible: !this.state.updatePassVisible,
    });
  }

  handleUpdatePass = async (val: any) => {
    await AuthService.updateUserPassword({
      oldPass: val.oldPass,
      newPass: val.newPass,
    });

    message.success(formatMessage({ id: 'page.setting.info.security.updatePass.message' }));
  }

  handleValidatorConfirmPass = (rule: any, value: string, callback: Function) => {
    const newPass = this.Form.getFieldValue('newPass');
    if (value && newPass !== value) {
      callback(formatMessage({ id: 'page.setting.info.security.updatePass.confirmPass.validate' }));
    }
    callback();
  }

  render() {
    const { updatePassVisible } = this.state;

    const list = [
      {
        title: formatMessage({ id: 'page.setting.info.security.password.title' }),
        description: formatMessage({ id: 'page.setting.info.security.password.description' }),
        actions: [
          <Button type="link" onClick={this.handleToggleUpdatePass}>
            {formatMessage({ id: 'page.setting.info.security.actions.update' })}
          </Button>,
        ],
      },
    ];

    const formModalConfig = {
      row: 1,
      form: [
        {
          label: formatMessage({ id: 'page.setting.info.security.updatePass.form.oldPass' }),
          props: 'oldPass',
          component: <Input type="password" />,
          required: true,
        },
        {
          label: formatMessage({ id: 'page.setting.info.security.updatePass.form.newPass' }),
          props: 'newPass',
          component: <Input type="password" />,
          required: true,
        },
        {
          label: formatMessage({ id: 'page.setting.info.security.updatePass.form.confirmPass' }),
          props: 'confrimPass',
          component: <Input type="password" />,
          required: true,
          rules: [
            { validator: this.handleValidatorConfirmPass }
          ],
        },
      ],
    };

    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <FormModal
          config={formModalConfig}
          visible={updatePassVisible}
          title={formatMessage({ id: 'page.setting.info.security.updatePass.form.title' })}
          onCancel={this.handleToggleUpdatePass}
          onSubmit={this.handleUpdatePass}
          onRef={form => {
            this.Form = form;
          }}
        />
      </>
    );
  }
}

export default connect()(Security);
