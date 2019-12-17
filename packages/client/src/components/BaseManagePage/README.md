# BaseManagePage 数据展示

基础数据展示组件

## 代码演示

```jsx
import React, { Component } from 'react';
import * as AuthService from '..';
import BaseManagePage from '..';

export default class Test extends Component {
  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: 120,
        align: 'center',
        fixed: 'left',
      },
    ];

    const queryForm = {
      row: 1,
      form: [
        {
          label: '用户名',
          props: 'userName',
          component: <Input />,
        },
      ],
    };

    return (
      <BaseManagePage
        columns={columns}
        fetchData={AuthService.getUsers}
        showSearch
        queryForm={queryForm}
        showColumnFilter
        onRef={table => {
          this.Table = table;
        }}
      >
    );
  }
}
```

## API

|       参数        |            说明             | 类型 ｜ 默认值 ｜ 版本  |
| :---------------: | :-------------------------: | :---------------------: | :---: | :---: |
|      columns      |        同`antd`属性         |     `ColumnProps[]`     |   -   |       |
|     fetchData     |      列表数据请求方法       | `Function(param): void` |   -   |       |
|    showSearch     |        是否开启搜索         |        `boolean`        | false |       |
|     queryForm     |          搜索表单           |        `object`         |   -   |       |
|  dataFilterTitle  |       搜索侧边栏标题        |        `string`         |   -   |       |
|  dataFilterWidth  |       搜索侧边栏宽度        |        `number`         |   -   |       |
| showColumnFilter  |      是否开启字段过滤       |        `boolean`        | false |       |
| columnFilterTitle |     字段过滤侧边栏标题      |        `string`         |   -   |       |
| columnFilterWidth |     字段过滤侧边栏宽度      |        `number`         |   -   |       |
|       onRef       |       获取`Table`实例       | `Function(table): void` |   -   |       |
|   ...antd table   | 其余一些`antd table` 的属性 |          `any`          |   -   |       |
