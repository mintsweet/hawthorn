import React, { Component } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

interface CaptchaProps {
  size?: 'large' | 'default' | 'small';
  codeLength?: number;
  placeholder?: string;
  color?: string;
  value?: string;
  onChange?: (val: string) => void;
};

export default class Captcha extends Component<CaptchaProps> {
  static getDerivedStateFromProps(nextProps: CaptchaProps) {
    if ('value' in nextProps) {
      return {
        code: nextProps.value,
      };
    }
    return null;
  }

  state = {
    code: '',
  };

  componentDidMount() {
    this.generateCode();
  }

  generateCode = () => {
    const { codeLength } = this.props;

    let code: string = '';
    const length = codeLength ? codeLength > 5 ? 5 : codeLength : 5;

    const selectChar = Array.from(new Array(36), (val, index) =>
      index > 9 ? String.fromCharCode(index + 65 - 10) : index,
    );

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * 36);
      code += selectChar[charIndex];
    }

    if (!('value' in this.props)) {
      this.setState({
        code,
      });
    }

    this.triggerChange(code);
  }

  triggerChange = (changeValue: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changeValue);
    }
  }

  render() {
    const { size, placeholder, color } = this.props;
    const { code } = this.state;

    const rowCls = classNames(styles.row, {
      [`${styles.large}`]: size === 'large',
      [`${styles.small}`]: size === 'small',
    });

    const captchaCls = classNames(styles.captcha, {
      [`${styles.large}`]: size === 'large',
      [`${styles.small}`]: size === 'small',
    });

    return (
      <div className={rowCls}>
        <div className={styles.col}>
          <Input
            size={size}
            placeholder={placeholder}
          />
        </div>
        <div className={styles.col}>
          <span
            style={{ color }}
            className={captchaCls}
            onClick={this.generateCode}
          >
            {code}
          </span>
        </div>
      </div>
    );
  }
}
