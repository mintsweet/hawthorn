import React, { Component } from 'react';
import { Table, Button, Drawer, Form, Row, Col, Tag } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { FormComponentProps } from 'antd/lib/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { chunk, find } from 'lodash';
import styles from './index.less';
import { __values } from 'tslib';

interface FormItem {
  label: string;
  props: string;
  component?: React.ReactNode;
  render?: any;
};

interface QueryFormProps {
  row: number;
  form: FormItem[];
  layout?: any;
};

interface BaseManagePageState {
  loading: boolean;
  page: number;
  size: number;
  list: any[];
  filterVisible: boolean;
  filter: any;
};

interface BaseManagePageProps extends FormComponentProps {
  columns: ColumnProps<any>[];
  fetchData: (param: object) => any;

  // 是否显示搜索选项
  showSearch?: boolean;
  // 搜索表单
  queryForm?: any;
  // 搜索表单标题
  filterTitle?: string;
  // 搜索表单宽度
  filterWidth?: number;

  onRef?: (target: any) => void;
};

class BaseManagePage extends Component<BaseManagePageProps, BaseManagePageState> {
  static defaultProps = {
    showSearch: false,
    queryForm: {
      row: 1,
      form: [],
    },
    filterTitle: formatMessage({ id: 'component.baseManagePage.filter.title' }),
    filterWidth: 360,
  };

  constructor(props: BaseManagePageProps) {
    super(props);
    this.state = {
      loading: true,
      page: 1,
      size: 10,
      list: [],
      filterVisible: false,
      filter: {},
    };
  }

  componentDidMount() {
    this.getData();
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  async getData(
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

  _handleToggleFilterDrawer = () => {
    this.props.form.resetFields();
    this.setState({
      filterVisible: !this.state.filterVisible,
    });
  }

  _handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getData(this.state.page, this.state.size, values);
        this._handleToggleFilterDrawer();
        this.setState({
          filter: values,
        });
      }
    });
  }

  _handleCloseFilterTag = (key: string) => {
    const { filter, page, size } = this.state;

    const newFilter = {
      ...filter,
      [key]: undefined,
    };

    this.setState({
      filter: newFilter,
    });

    this.getData(page, size, newFilter);
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
    const { loading, list, filterVisible, filter } = this.state;
    const {
      children,
      columns,
      showSearch,
      queryForm,
      filterTitle,
      filterWidth,
    } = this.props;

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
      <>
        <div className={styles.action}>
          {children}
          {showSearch && (
            <div className={styles.btns}>
              <Button
                onClick={this._handleToggleFilterDrawer}
              >{formatMessage({ id: 'component.baseManagePage.btns.search' })}</Button>
              <Button>{formatMessage({ id: 'component.baseManagePage.btns.reset' })}</Button>
            </div>
          )}
        </div>
        {showSearch && Object.keys(filter).length > 0 && (
          <div className={styles.filter}>
            {Object.keys(filter).map((key, i) => {
              if (!filter[key]) return;
              const { label } = find(queryForm.form, { props: key });
              return (
                <Tag
                  key={`${key}${i + 1}`}
                  closable
                  onClose={() => this._handleCloseFilterTag(key)}>
                  {`${label} : ${filter[key]}`}
                </Tag>
              );
            })}
          </div>
        )}
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={list}
          loading={loading}
        />
        {showSearch && (
          <Drawer
            title={filterTitle}
            width={filterWidth}
            visible={filterVisible}
            onClose={this._handleToggleFilterDrawer}
          >
            <Form {...formItemLayout}>{this._renderQueryForm(queryForm)}</Form>
            <div className={styles.filterPanelBottom}>
              <Button
                onClick={this._handleToggleFilterDrawer}
                style={{ marginRight: 8 }}
              >{formatMessage({ id: 'component.baseManagePage.filter.btns.cancel' })}</Button>
              <Button
                type="primary"
                onClick={this._handleSearch}
              >{formatMessage({ id: 'component.baseManagePage.filter.btns.submit' })}</Button>
            </div>
          </Drawer>
        )}
      </>
    );
  }
}

export default Form.create<BaseManagePageProps>()(BaseManagePage);
