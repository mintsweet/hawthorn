# Captcha 验证码

前端验证码组件

## 代码演示

```jsx
import React, { Component } from 'react';
import { Form } from 'antd';
import Captcha from '..';

const { FormItem } = Form;

class Test extends Component {
  state = {
    loginCode: '',
  };

  handleVlidatorCaptcha = (rule: any, value: any, callback: any) => {
    const { loginCode } = this.state;

    if (value && value.toLowerCase() !== loginCode.toLowerCase()) {
      callback('验证码错误');
    }

    callback();
  }

  handleCodeChange = (val: string) => {
    this.setState({
      loginCode: val,
    });
  }

  render() {
    const { loginCode } = this.state;
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [
              {
                required: true,
                message: '验证码不能为空',
              },
              {
                validator: this.handleVlidatorCaptcha,
              },
            ],
          })(
            <Captch
              size="large"
              placeholder="验证码"
              code={loginCode}
              codeChange={this.handleCodeChange}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Captcha);
```

## API

|    参数     |         说明         |  类型 ｜ 默认值 ｜ 版本   |
| :---------: | :------------------: | :-----------------------: | :-----: | :---: |
|    code     |        验证码        |         `string`          |    -    |       |
| codeLength  |      验证码长度      |         `number`          |    4    |       |
|    size     |        框大小        | `large | default | small` | default |       |
| placeholder |     输入框占位符     |         `string`          |    -    |       |
|    color    |       文字颜色       |         `string`          |    -    |       |
| codeChange  |    验证码变化事件    |  `Function(code): void`   |    -    |       |
