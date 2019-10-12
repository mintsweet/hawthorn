import React, { Component } from 'react';
import { Modal, Form, Row, Col } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { FormComponentProps } from 'antd/lib/form';
import { chunk, isEqual } from 'lodash';

interface FormItem {
  label: string;
  props: string;
  component?: React.ReactNode;
  render?: any;
  required?: boolean;
  rules?: any;
};

interface FormModalConfigProps {
  row: number;
  form: FormItem[];
  layout?: any;
};

interface FormModalProps extends ModalProps {
  config: FormModalConfigProps;
  data: any;
  onSubmit: (val: any) => void;
  onCancel: () => void;
};

interface State {
  data: {
    [key: string]: string;
  };
};

class FormModal extends Component<FormModalProps & FormComponentProps, State> {
  static getDerivedStateFromProps(nextProps: FormModalProps & FormComponentProps, prevState: any) {
    if (!isEqual(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
      };
    }
    return null;
  }

  constructor(props: FormModalProps & FormComponentProps) {
    super(props);
    this.state = {
      data: {},
    };
  }

  renderForm = (config: FormModalConfigProps) => {
    const { data } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return chunk(config.form, config.row).map((arr, i) => (
      <Row key={i}>
        {arr.map((item, j) => {
          let rules = item.rules || [];
          if (item.required) {
            rules.push({
              required: item.required,
              message: `${item.label}不能为空`,
            });
          }

          return (
            <Col key={j} span={24 / config.row}>
              <Form.Item {...config.layout} label={item.label}>
                {getFieldDecorator(`${item.props}`, {
                  initialValue: data[item.props],
                  rules: rules,
                })(item.component ? item.component : item.render(form))}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    ));
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
        this.handleClose();
      }
    });
  };

  handleClose = () => {
    this.props.form.resetFields();
    this.props.onCancel();
  };

  render() {
    const { config } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <Modal
        style={{ top: '5vh' }}
        {...this.props}
        onOk={this.handleSubmit}
        onCancel={this.handleClose}
      >
        <Form {...formItemLayout}>
          {this.renderForm(config)}
        </Form>
      </Modal>
    );
  }
}

export default Form.create<FormModalProps & FormComponentProps>()(FormModal);
