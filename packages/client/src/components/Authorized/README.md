# Authorized 权限

权限组件

## 代码演示

```jsx
import React, { Component } from 'react';
import Authorized from '..';

export default class Test extends Component {
  render() {
    return (
      <Authorized has="/key">
        <span>具有权限才会渲染的内容</span>
      </Authorized>
    );
  }
}
```

## API

| 参数  |     说明      | 类型 ｜ 默认值 ｜ 版本 |
| :---: | :-----------: | :--------------------: | :---: | :---: |
|  has  | 拥有的权限key |  `string | string[]`   |   -   | 1.0.0 |
