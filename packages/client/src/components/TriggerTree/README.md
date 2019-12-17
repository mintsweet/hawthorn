# TriggerTree 树形选择器

树形选择器

## 代码演示

```jsx
import React, { Component } from 'react';
import { Form } from 'antd';
import TriggerTree from '..';

const { FormItem } = Form;

class Test extends Component {
  state = {
    treeData: [],
  };

  render() {
    const { treeData } = this.state;
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('permissions', {
            rules: [
              {
                required: true,
                message: '权限不能为空',
              },
            ],
          })(
            <TriggerTree data={treeData} />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Test);
```

## API

|   参数   | 说明  | 类型 ｜ 默认值 ｜ 版本 |
| :------: | :---: | :--------------------: | :---: | :---: |
|   data   |  树   |        `array`         |   -   |       |
| disabled | 禁用  |       `boolean`        | false |       |
