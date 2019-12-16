import React, { Component } from 'react';
import { Drawer, Checkbox, Row, Col, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from '../index.less';

interface ColumnFilterState {
  indeterminate: boolean;
  checkAll: boolean;
  checkedList: any[];
}

interface ColumnFilterProps {
  visible: boolean;
  options: Array<{
    label: string;
    value: string;
  }>;
  checkedList: string[];
  title?: string;
  width?: number;
  onToggleVisible?: () => void;
  onSubmit?: (val: any[]) => void;
}

export default class ColumnFilter extends Component<ColumnFilterProps, ColumnFilterState> {
  static defaultProps = {
    width: 260,
    onToggleVisible: () => ({}),
  };

  constructor(props: ColumnFilterProps) {
    super(props);
    this.state = {
      indeterminate: false,
      checkAll: true,
      checkedList: props.options.map(item => item.value),
    };
  }

  handleCheckAll = (e: any) => {
    const { options } = this.props;
    const checked = e.target.checked;
    const checkedList = checked ? options.map(item => item.value) : [];

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked,
    });
  }

  handleCheckChange = (checkedList: any[]) => {
    const { options } = this.props;

    this.setState({
      checkedList,
      checkAll: checkedList.length === options.length,
      indeterminate: !!checkedList.length && checkedList.length < options.length,
    });
  }

  handleSubmit = () => {
    const { checkedList } = this.state;
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit(checkedList);
    }
  }

  render() {
    const { indeterminate, checkAll, checkedList } = this.state;
    const { visible, options, title, width, onToggleVisible } = this.props;

    return (
      <Drawer
        visible={visible}
        title={title || formatMessage({ id: 'component.baseManagePage.columnFilter.defaultTitle' })}
        width={width}
        onClose={onToggleVisible}
      >
        <div style={{ paddingBottom: 10, borderBottom: '1px solid #e9e9e9' }}>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={this.handleCheckAll}
          >
            {formatMessage({ id: 'component.baseManagePage.columnFilter.checkAll' })}
          </Checkbox>
        </div>
        <Checkbox.Group value={checkedList} onChange={this.handleCheckChange}>
          {options.map(item => (
            <Row className={styles.columnFilterItem} key={item.value}>
              <Col>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            </Row>
          ))}
        </Checkbox.Group>
        <div className={styles.drawerBottom}>
          <Button
            onClick={onToggleVisible}
            style={{ marginRight: 8 }}
          >
            {formatMessage({ id: 'component.baseManagePage.drawer.btns.cancel' })}
          </Button>
          <Button
            type="primary"
            onClick={this.handleSubmit}
          >
            {formatMessage({ id: 'component.baseManagePage.drawer.btns.submit' })}
          </Button>
        </div>
      </Drawer>
    );
  }
}
