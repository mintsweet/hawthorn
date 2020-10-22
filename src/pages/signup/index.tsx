import React from 'react';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Item: FormItem } = Form;
const { Password } = Input;

export default function UserSignup() {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <div className={styles.wrapper}>
      <Form {...formItemLayout} className={styles.form}>
        <FormItem {...tailFormItemLayout} className={styles.title}>
          用户注册
        </FormItem>
        <FormItem
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '邮箱不能为空',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          label="昵称"
          name="nickname"
          rules={[
            {
              required: true,
              message: '昵称不能为空',
            },
          ]}
        >
          <Input placeholder="请输入昵称" />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
        >
          <Password placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="确认密码"
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
        >
          <Password placeholder="请输入密码" />
        </FormItem>
        <Form.Item label="验证码" extra="我们必须确认你不是机器人">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          {...tailFormItemLayout}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement'),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
