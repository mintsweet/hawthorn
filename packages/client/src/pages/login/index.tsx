import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ConnectState, ConnectProps } from '@/models/connect';
import Captch from '@/components/Captcha';

const { Item: FormItem } = Form;

interface LoginProps extends FormComponentProps, ConnectProps {
  autoLogin: boolean;
  loginStatus: number;
};

class Login extends Component<LoginProps> {
  state = {
    loginCode: '',
  };

  componentDidMount() {
    const { autoLogin, loginStatus } = this.props;
    if (autoLogin && loginStatus === 1) {
      router.push('/');
    }
  }

  handleCodeChange = (val: string) => {
    this.setState({
      loginCode: val,
    });
  }

  handleChangeAutoLogin = (e: CheckboxChangeEvent) => {
    this.props.dispatch({
      type: 'global/changeAutoLogin',
      payload: e.target.checked,
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          payload: values,
        });
      }
    });
  }

  handleVlidatorCaptcha = (rule: any, value: any, callback: any) => {
    const { loginCode } = this.state;

    if (value && value.toLowerCase() !== loginCode.toLowerCase()) {
      callback(formatMessage({ id: 'page.login.captcha.error' }));
    }

    callback();
  }

  render() {
    const { loginCode } = this.state;
    const { form, autoLogin, } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.login.username.required' }),
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'page.login.username.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.login.password.required' })
              },
            ],
          })(
            <Input
              type="password"
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'page.login.password.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.login.captcha.required' }),
              },
              {
                validator: this.handleVlidatorCaptcha,
              },
            ],
          })(
            <Captch
              size="large"
              placeholder={formatMessage({ id: 'page.login.captcha.placeholder' })}
              code={loginCode}
              codeChange={this.handleCodeChange}
            />
          )}
        </FormItem>
        <div style={{ marginBottom: 15 }}>
          <Checkbox
            checked={autoLogin}
            onChange={this.handleChangeAutoLogin}
          >
            {formatMessage({ id: 'page.login.checkbox' })}
          </Checkbox>
        </div>
        <FormItem>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            {formatMessage({ id: 'page.login.submit' })}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(
  ({ global, user }: ConnectState) => ({
    autoLogin: global.autoLogin,
    loginStatus: user.status,
  })
)(
  Form.create()(Login)
);
