# PageHeader 页面头

页面头组件

## 代码演示

```jsx
import React, { Component } from 'react';
import { Input } from 'antd';
import PageHeader from '..';

export default class Test extends Component {
  render() {
    return (
      <PageHeader>
        <span>内容</span>
      </PageHeader>
    );
  }
}
```

## API

|       参数       |        说明        | 类型 ｜ 默认值 ｜ 版本 |
| :--------------: | :----------------: | :--------------------: | :---: | :---: |
| hiddenBreadcrumb | 是否隐藏面包屑导航 |       `boolean`        | false |       |
