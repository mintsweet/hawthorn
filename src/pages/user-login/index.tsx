import React from 'react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthStore from '@/store/auth';

const { Item: FormItem } = Form;
const { Password } = Input;

function UserLogin({ intl: { formatMessage } }: WrappedComponentProps) {
  const onFinish = (values: any) => {
    AuthStore.dispatch('login', values);
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <FormItem
        name="username"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'page.user-login.username.required' }),
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder={formatMessage({
            id: 'page.user-login.username.placeholder',
          })}
        />
      </FormItem>
      <FormItem
        name="password"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'page.user-login.password.required' }),
          },
        ]}
      >
        <Password
          size="large"
          prefix={<LockOutlined />}
          placeholder={formatMessage({
            id: 'page.user-login.password.placeholder',
          })}
        />
      </FormItem>
      <FormItem name="remember" valuePropName="checked">
        <Checkbox>
          <FormattedMessage id="page.user-login.remember" />
        </Checkbox>
      </FormItem>
      <FormItem>
        <Button size="large" type="primary" block htmlType="submit">
          <FormattedMessage id="page.user-login.submit" />
        </Button>
      </FormItem>
    </Form>
  );
}

export default injectIntl(UserLogin);
