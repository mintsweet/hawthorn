import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Drawer, Form, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { chunk } from 'lodash';
import styles from '../index.less';

interface QueryFormProps {
  row: number;
  form: {
    label: string;
    props: string;
    component?: React.ReactNode;
    render?: any;
  }[];
  layout?: any;
};

interface DataFilterProps extends FormComponentProps {
  visible: boolean;
  queryForm: QueryFormProps;
  title?: string;
  width?: number;
  onToggleVisible?: () => void;
  onSubmit?: () => void;
}

export default class DataFilter extends Component<DataFilterProps> {
  static defaultProps = {
    width: 360,
    onToggleVisible: () => {},
  }

  _renderQueryForm = (queryConfig: QueryFormProps) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return chunk(queryConfig.form, queryConfig.row).map((arr, i) => (
      <Row key={i}>
        {arr.map((item, j) => (
          <Col key={j} span={24 / queryConfig.row}>
            <Form.Item {...queryConfig.layout} label={item.label}>
              {getFieldDecorator(`${item.props}`, {
              })(item.component ? item.component : item.render(form))}
            </Form.Item>
          </Col>
        ))}
      </Row>
    ));
  }

  render() {
    const { visible, title, width, queryForm, onToggleVisible, onSubmit } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Drawer
        title={title || formatMessage({ id: 'component.baseManagePage.dataFilter.defaultTitle' })}
        width={width}
        visible={visible}
        onClose={onToggleVisible}
      >
        <Form {...formItemLayout}>{this._renderQueryForm(queryForm)}</Form>
        <div className={styles.drawerBottom}>
          <Button
            onClick={onToggleVisible}
            style={{ marginRight: 8 }}
          >
            {formatMessage({ id: 'component.baseManagePage.drawer.btns.cancel' })}
          </Button>
          <Button
            type="primary"
            onClick={onSubmit}
          >
            {formatMessage({ id: 'component.baseManagePage.drawer.btns.submit' })}
          </Button>
        </div>
      </Drawer>
    );
  }
}
