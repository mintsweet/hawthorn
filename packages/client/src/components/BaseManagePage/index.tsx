import React, { Component } from 'react';
import { Table, Button, Form, Tag } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { find } from 'lodash';
import DataFilter from './components/DataFilter';
import ColumnFilter from './components/ColumnFilter';
import styles from './index.less';

interface BaseManagePageState {
  loading: boolean;
  page: number;
  size: number;
  list: any[];
  dataFilterVisible: boolean,
  dataFilter: any,
  columnFilterVisible: boolean,
  columnChecked: any[],
};

interface BaseManagePageProps extends FormComponentProps {
  columns: any[];
  fetchData: (param: object) => any;

  showSearch?: boolean;
  queryForm?: any;
  dataFilterTitle?: string;
  dataFilterWidth?: number;

  showColumnFilter?: boolean;
  columnFilterTitle?: string;
  columnFilterWidth?: number;

  onRef?: (target: any) => void;
};

class BaseManagePage extends Component<BaseManagePageProps, BaseManagePageState> {
  static defaultProps = {
    showSearch: false,
    showColumnFilter: false,
    queryForm: {
      row: 1,
      form: [],
    },
  };

  constructor(props: BaseManagePageProps) {
    super(props);
    this.state = {
      loading: true,
      page: 1,
      size: 10,
      list: [],

      dataFilterVisible: false,
      dataFilter: {},

      columnFilterVisible: false,
      columnChecked: [],
    };
  }

  static getDerivedStateFromProps(props: BaseManagePageProps, state: any) {
    if (state.columnChecked.length === 0) {
      return {
        columnChecked: props.columns.map(item => item.dataIndex || item.key),
      };
    }
    return null;
  }

  componentDidMount() {
    this._getData();
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  async _getData(
    page: number = this.state.page,
    size: number = this.state.size,
    condition: object = {},
  ) {
    const { data } = await this.props.fetchData({ page, size, ...condition });
    this.setState({
      ...data,
      loading: false,
    });
  }

  // Data Filter Controller
  _handleToggleDataFilter = () => {
    this.props.form.resetFields();
    this.setState({
      dataFilterVisible: !this.state.dataFilterVisible,
    });
  }

  // Column Filter Controller
  _handleToggleColumnFilter = () => {
    this.setState({
      columnFilterVisible: !this.state.columnFilterVisible,
    });
  }

  // Column Filter Change
  _handleChangeColumnFilter = (checkList: any[]) => {
    this._handleToggleColumnFilter();
    this.setState({
      columnChecked: checkList,
    });
  }

  // Search
  _handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._getData(this.state.page, this.state.size, values);
        this._handleToggleDataFilter();
        this.setState({
          dataFilter: values,
        });
      }
    });
  }

  // Reset
  _handleReset = () => {
    const { page, size } = this.state;

    this._getData(page, size);
    this.setState({
      dataFilter: {},
    });
  }

  // Close Data Filter Tag
  _handleCloseDataFilterTag = (key: string) => {
    const { dataFilter, page, size } = this.state;

    const newFilter = {
      ...dataFilter,
      [key]: undefined,
    };

    this.setState({
      dataFilter: newFilter,
    });

    this._getData(page, size, newFilter);
  }

  render() {
    const {
      loading,
      list,
      dataFilterVisible,
      dataFilter,
      columnFilterVisible,
      columnChecked,
    } = this.state;
    const {
      children,
      form,
      columns,
      showSearch,
      queryForm,
      dataFilterTitle,
      dataFilterWidth,
      showColumnFilter,
      columnFilterTitle,
      columnFilterWidth,
    } = this.props;

    const columnOptions: any = columns.map(item => ({
      label: item.title,
      value: item.dataIndex || item.key,
    }));

    const tableColumns = columnChecked.length > 0
      ? columns.filter(item =>
         columnChecked.includes(item.dataIndex) || columnChecked.includes(item.key))
      : columns;

    return (
      <>
        <div className={styles.action}>
          {children}
          {showSearch && (
            <div className={styles.btns}>
              <Button
                onClick={this._handleToggleDataFilter}
              >{formatMessage({ id: 'component.baseManagePage.btns.search' })}</Button>
              <Button
                onClick={this._handleReset}
              >{formatMessage({ id: 'component.baseManagePage.btns.reset' })}</Button>
            </div>
          )}
          {showColumnFilter && (
            <Button
              className={styles.columnFilter}
              icon="table"
              onClick={this._handleToggleColumnFilter}
            />
          )}
        </div>
        {showSearch && Object.keys(dataFilter).length > 0 && (
          <div className={styles.filter}>
            {Object.keys(dataFilter).map((key, i) => {
              if (!dataFilter[key]) return;
              const { label } = find(queryForm.form, { props: key });
              return (
                <Tag
                  key={`${key}${i + 1}`}
                  closable
                  onClose={() => this._handleCloseDataFilterTag(key)}>
                  {`${label} : ${dataFilter[key]}`}
                </Tag>
              );
            })}
          </div>
        )}
        {showSearch && (
          <DataFilter
            title={dataFilterTitle}
            width={dataFilterWidth}
            visible={dataFilterVisible}
            queryForm={queryForm}
            form={form}
            onToggleVisible={this._handleToggleDataFilter}
            onSubmit={this._handleSearch}
          />
        )}
        {showColumnFilter && (
          <ColumnFilter
            visible={columnFilterVisible}
            title={columnFilterTitle}
            width={columnFilterWidth}
            options={columnOptions}
            checkedList={columnChecked}
            onToggleVisible={this._handleToggleColumnFilter}
            onSubmit={this._handleChangeColumnFilter}
          />
        )}
        <Table
          rowKey="_id"
          columns={tableColumns}
          dataSource={list}
          loading={loading}
        />
      </>
    );
  }
}

export default Form.create<BaseManagePageProps>()(BaseManagePage);
