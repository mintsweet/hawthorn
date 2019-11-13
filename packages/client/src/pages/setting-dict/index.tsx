import React, { Component } from 'react';
import {
  Table,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Switch,
  Spin,
  message,
} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import PageHeader from '@/components/PageHeader';
import * as SettingService from '@/services/setting';
import styles from './index.less';

export default class SystemConfig extends Component {
  state = {
    dict: [],
    loading: true,
    updateKey: '',
    updateValue: undefined,
    updateStatus: 'done',
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { data } = await SettingService.getDicts();
    this.setState({
      dict: data,
      loading: false,
    });
  }

  handleUpdate = async (key: string, record: any) => {
    this.setState({
      updateKey: key,
      updateValue: record.value,
    });
  }

  handleSubmit = () => {
    const { updateKey, updateValue } = this.state;

    this.setState({
      updateStatus: 'doing',
    }, async () => {
      await SettingService.updateDict(updateKey, { value: updateValue });
      await this.getData();
      message.success(formatMessage({ id: 'page.setting.dict.update.message' }));
      this.handleCancel();
    });
  }

  handleCancel = () => {
    this.setState({
      updateKey: '',
      updateValue: undefined,
      updateStatus: 'done',
    });
  }

  handleChange = (value: any) => {
    this.setState({
      updateValue: value,
    });
  }

  renderNumber = (value: number, updating: boolean) =>
    updating ? (
      <InputNumber
        value={updating ? this.state.updateValue: value}
        onChange={v => this.handleChange(v)}
      />
    ) : value;

  renderBoolean = (value: boolean, updating: boolean) => (
    <Switch
      checked={updating ? this.state.updateValue : value}
      onChange={(checked) => this.handleChange(checked)}
      disabled={!updating}
    />
  );

  renderString = (value: string, updating: boolean) =>
    updating ? (
      <Input
        value={updating ? this.state.updateValue : value}
        onChange={(e) => this.handleChange(e.target.value)}
      />
    ) : value;

  renderValue = (value: any, record: any) => {
    let dom;
    const updating = this.state.updateKey === record.key;

    switch(record.type) {
      case 'number':
        dom = this.renderNumber(value, updating);
        break;
      case 'boolean':
        dom = this.renderBoolean(value, updating);
        break;
      case 'string':
      default:
        dom = this.renderString(value, updating);
        break;
    }

    return (
      <div>
        {dom}
      </div>
    );
  }

  renderOperate = (key: string, record: any) => {
    if (this.state.updateKey === key) {
      if (this.state.updateStatus === 'doing') {
        return <Spin size="small" />;
      }

      return (
        <>
          <Button type="link" onClick={this.handleSubmit}>
            {formatMessage({ id: 'page.setting.dict.operate.submit' })}
          </Button>
          <Popconfirm
            title={formatMessage({ id: 'page.setting.dict.operate.cancel.tip' })}
            onConfirm={this.handleCancel}
          >
            <Button type="link">
            {formatMessage({ id: 'page.setting.dict.operate.cancel' })}
            </Button>
          </Popconfirm>
        </>
      );
    }

    return (
      <Button type="link" onClick={() => this.handleUpdate(key, record)}>
        {formatMessage({ id: 'page.setting.dict.operate.update' })}
      </Button>
    );
  };

  tagColumns = [
    {
      title: formatMessage({ id: 'page.setting.dict.tag.columns' }),
      dataIndex: '_id',
      render: (value: string, record: any) => `${value} (${record.dict.length})`,
    },
  ];

  dictColumns = [
    {
      width: '50%',
      title: formatMessage({ id: 'page.setting.dict.dict.columns.key' }),
      dataIndex: 'key',
      render: (_: string, row: any) => (
        <div className={styles.configItem}>
          <strong>{row.key}</strong>
          <span>{row.note}</span>
        </div>
      ),
    },
    {
      width: '35%',
      title: formatMessage({ id: 'page.setting.dict.dict.columns.value' }),
      dataIndex: 'value',
      align: 'center' as 'center',
      render: this.renderValue,
    },
    {
      width: '15%',
      title: formatMessage({ id: 'page.setting.dict.dict.columns.operate' }),
      key: 'operate',
      dataIndex: 'key',
      align: 'center' as 'center',
      render: this.renderOperate,
    },
  ];

  render() {
    const { dict, loading } = this.state;

    return (
      <PageHeader hiddenBreadcrumb className={styles.dict}>
        <Table
          rowKey={record => record._id}
          size="middle"
          loading={loading}
          columns={this.tagColumns}
          dataSource={dict}
          expandedRowRender={tag => (
            <Table
              rowKey={record => record._id}
              size="middle"
              columns={this.dictColumns}
              dataSource={tag.dict}
              pagination={false}
            />
          )}
          pagination={false}
        />
      </PageHeader>
    );
  }
}
