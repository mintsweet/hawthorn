import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

interface BaseManagePageState {
  loading: boolean;
  page: number;
  size: number;
  list: any[];
};

interface BaseManagePageProps {
  columns: ColumnProps<any>[];
  fetchData: (param: object) => any;
  showSearch?: boolean;
  onRef?: (target: any) => void;
};

export default class BaseManagePage extends Component<BaseManagePageProps, BaseManagePageState> {
  static defaultProps = {
    showSearch: false,
  };

  state = {
    loading: false,
    page: 1,
    size: 10,
    list: [],
  };

  componentDidMount() {
    this.getData();
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  async getData(
    page: number = this.state.page,
    size: number = this.state.size,
  ) {
    const { data } = await this.props.fetchData({ page, size });
    this.setState({
      ...data,
    });
  }

  render() {
    const { list } = this.state;
    const { children, columns, showSearch } = this.props;

    return (
      <>
        <div className={styles.action}>
          {children}
          {showSearch && (
            <div className={styles.btns}>
              <Button>{formatMessage({ id: 'component.baseManagePage.btns.search' })}</Button>
              <Button>{formatMessage({ id: 'component.baseManagePage.btns.reset' })}</Button>
            </div>
          )}
        </div>
        {showSearch && (
          <div className={styles.filter}>

          </div>
        )}
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={list}
        />
      </>
    );
  }
}
