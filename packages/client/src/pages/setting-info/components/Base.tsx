import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { Form, Input, Avatar, Button, Upload } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '../index.less';

const { Item: FormItem } = Form;

interface BaseProps extends FormComponentProps {
  user: any;
};

class Base extends Component<BaseProps> {
  render() {
    const { user, form: { getFieldDecorator } } = this.props;

    return (
      <div className={styles.base}>
        <div className={styles.left}>
          <Form layout="vertical">
            <FormItem label={formatMessage({ id: 'page.setting.info.base.form.username' })}>
              <Input value={user.username} disabled />
            </FormItem>
            <FormItem label={formatMessage({ id: 'page.setting.info.base.form.nickname' })}>
              {getFieldDecorator('nickname', {
                initialValue: user.nickname,
              })(
                <Input />
              )}
            </FormItem>
            <Button type="primary">
              {formatMessage({ id: 'page.setting.info.base.form.submit' })}
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <div className={styles.avatar_title}>{formatMessage({ id: 'page.setting.info.base.form.avatar' })}</div>
          <Avatar className={styles.avatar} size={120} icon="user" src={user.avatar} />
          <Upload fileList={[]}>
            <div className={styles.button_view}>
              <Button icon="upload">
                {formatMessage({ id: 'page.setting.info.base.form.avatar.update' })}
              </Button>
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default Form.create<BaseProps>()(Base);
