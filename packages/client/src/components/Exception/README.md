# Exception 异常

异常组件

## 代码演示

```jsx
import React, { Component } from 'react';

export default class Test extends Component {
  render() {
    return (
      <Exception type={404} />
    );
  }
}
```

## API

| 参数  |   说明   | 类型 ｜ 默认值 ｜ 版本 |
| :---: | :------: | :--------------------: | :---: | :---: |
| type  | 异常类型 |   `403 | 404 | 500`    |   -   |       |
| title | 异常名称 |        `string`        |   -   |       |
