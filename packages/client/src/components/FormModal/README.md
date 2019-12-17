# FormModal 弹窗表单

表单弹窗组件

## 代码演示

```jsx
import React, { Component } from 'react';
import { Input } from 'antd';
import FormModal from '..';

export default class Test extends Component {
  state = {
    visible: false,
  };

  handleToggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleSubmit = data => {
    console.log('提交数据：', data);
  }
  
  render() {
    const config: any = {
      row: 1,
      form: [
        {
          label: '名称',
          props: 'name',
          component: <Input />,
          required: true,
        },
      ],
    };

    return (
      <FormModal
        config={config}
        title="弹窗标题"
        visible={visible}
        onCancel={this.handleToggleVisible}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
```

## API

|   参数   |        说明        | 类型 ｜ 默认值 ｜ 版本 |
| :------: | :----------------: | :--------------------: | :---: | :---: |
|  config  |      表单配置      |        `object`        |   -   |       |
|   data   |      默认数据      |        `object`        |   -   |       |
| onSubmit |    表单确认函数    | `Function(data): void` |   -   |       |
| onCancel |    表单取消函数    |   `Function(): void`   |   -   |       |
|  onRef   | 获取`form`实例函数 | `Function(form): void` |   -   |       |
