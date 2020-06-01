import React from 'react';
import { useIntl } from 'umi';
import { Modal, Form, Input, message } from 'antd';
import * as Service from '../service';

const { Item: FormItem } = Form;
const { Password } = Input;

interface Props {
  onCancel: () => void;
}

export default ({ onCancel }: Props) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      await Service.updatePass(values);
      message.success('修改密码成功');
      form.resetFields();
      onCancel();
    });
  };

  return (
    <Modal
      visible
      title={formatMessage({ id: 'page.user-info.safety.password' })}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form {...layout} form={form} name="password">
        <FormItem
          name="oldPass"
          label={formatMessage({ id: 'page.user-info.password.oldPass' })}
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user-info.password.oldPass.required',
              }),
            },
          ]}
        >
          <Password />
        </FormItem>
        <FormItem
          name="newPass"
          label={formatMessage({ id: 'page.user-info.password.newPass' })}
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user-info.password.newPass.required',
              }),
            },
          ]}
        >
          <Password />
        </FormItem>
        <FormItem
          name="confirmPass"
          label={formatMessage({ id: 'page.user-info.password.confirmPass' })}
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user-info.password.confirmPass.required',
              }),
            },
            ({ getFieldValue }) => ({
              validator: (_, value) => {
                if (!value || getFieldValue('newPass') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  formatMessage({
                    id: 'page.user-info.password.confirmPass.notEqual',
                  }),
                );
              },
            }),
          ]}
        >
          <Password />
        </FormItem>
      </Form>
    </Modal>
  );
};
