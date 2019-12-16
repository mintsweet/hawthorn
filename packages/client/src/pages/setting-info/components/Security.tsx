import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-locale';
import { List, Button, Input, Tag, message } from 'antd';
import { ConnectState, ConnectProps } from '@/models/connect';
import { UserModelState } from '@/models/user';
import FormModal from '@/components/FormModal';

interface SecurityProps extends ConnectProps {
  user: UserModelState;
}

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
    this.props.dispatch({
      type: 'user/updatePass',
      payload: {
        oldPass: val.oldPass,
        newPass: val.newPass,
      },
    }).then(() => {
      this.setState({
        loading: false,
      });
      message.success(formatMessage({ id: 'page.setting.info.security.updatePass.message' }));
    });
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
    const { user } = this.props;

    const passwordStrengthMap: any = {
      'strong': <Tag color="green">{formatMessage({ id: 'page.setting.info.security.password.description.strong' })}</Tag>,
      'medium': <Tag color="orange">{formatMessage({ id: 'page.setting.info.security.password.description.medium' })}</Tag>,
      'weak': <Tag color="red">{formatMessage({ id: 'page.setting.info.security.password.description.weak' })}</Tag>,
    };

    const list = [
      {
        title: formatMessage({ id: 'page.setting.info.security.password.title' }),
        description: (
          <>
            <span>{formatMessage({ id: 'page.setting.info.security.password.description' })}：</span>
            {passwordStrengthMap[user.passwordStrength]}
          </>
        ),
        actions: [
          (
            <Button key="update" type="link" onClick={this.handleToggleUpdatePass}>
              {formatMessage({ id: 'page.setting.info.security.actions.update' })}
            </Button>
          ),
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

export default connect(
  ({ user }: ConnectState) => ({
    user,
  }),
)(Security);
