import React, { Component } from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { Item: FormItem } = Form;

class Login extends Component<FormComponentProps> {
  handleSubmit = (e: React.FormEvent) => {

  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.login.username.required' }),
              }
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
              }
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
          <Checkbox>{formatMessage({ id: 'page.login.checkbox' })}</Checkbox>
          <Link to="/user/forget_pass" style={{ float: 'right' }}>{formatMessage({ id: 'page.login.forget' })}</Link>
        </FormItem>
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

export default Form.create()(Login);
