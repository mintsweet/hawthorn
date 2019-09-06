import React, { Component } from 'react';
import Link from 'umi/link';
import { Form, Input, Icon, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/lib/form';
import Captch from '@/components/Captcha';

const { Item: FormItem } = Form;

class ForgetPass extends Component<FormComponentProps> {
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
                message: formatMessage({ id: 'page.forget.password.username.required' }),
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'page.forget.password.username.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.forget.password.email.required' }),
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'page.forget.password.email.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'page.forget.password.captcha.required' }),
              },
            ],
          })(
            <Captch
              size="large"
              codeLength={4}
              placeholder={formatMessage({ id: 'page.forget.password.captcha.placeholder' })}
            />
          )}
        </FormItem>
        <div style={{ marginBottom: 15 }}>
          <Link to="/user/login">{formatMessage({ id: 'page.forget.password.login' })}</Link>
        </div>
        <FormItem>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            {formatMessage({ id: 'page.forget.password.submit' })}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ForgetPass);
