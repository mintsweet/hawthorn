import React, { useState, useEffect } from 'react';
import {
  Table,
  InputNumber,
  Switch,
  Input,
  Button,
  Popconfirm,
  Spin,
  message,
} from 'antd';
import * as Service from './service';

export default function Dict() {
  const [loading, setLoading] = useState(false);
  const [dict, setDict] = useState([]);
  const [updateKey, setUpdateKey] = useState('');
  const [updateValue, setUpdateValue] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState('done');

  const getData = async () => {
    const { data } = await Service.queryDict();
    setDict(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = (record: any) => {
    setUpdateKey(record.key);
  };

  const handleCancel = () => {
    setUpdateKey('');
    setUpdateValue(null);
    setUpdateStatus('done');
  };

  const handleSubmit = async () => {
    setUpdateStatus('doing');
    await Service.updateDict(updateKey, { value: updateValue });
    message.success('更新字典成功');
    handleCancel();
    getData();
  };

  const renderValue = (value: any, record: any) => {
    switch (record.type) {
      case 'number':
        return updateKey !== record.key ? (
          value
        ) : (
          <InputNumber
            value={updateValue || record.value}
            onChange={(n) => setUpdateValue(n)}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={
              updateKey !== record.key ||
              (!updateValue && updateValue !== false)
                ? record.value
                : updateValue
            }
            onChange={(checked) => setUpdateValue(checked)}
            disabled={updateKey !== record.key}
          />
        );
      case 'string':
      default:
        return updateKey !== record.key ? (
          value
        ) : (
          <Input
            value={updateValue || record.value}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
        );
    }
  };

  const renderOperate = (_: any, record: any) => {
    if (updateKey === record.key) {
      if (updateStatus === 'doing') return <Spin />;
      return [
        <Popconfirm
          key="submit"
          title="确认要保存本次修改吗？"
          onConfirm={handleSubmit}
        >
          <Button type="link">保存</Button>
        </Popconfirm>,
        <Button key="cancel" type="link" onClick={handleCancel}>
          取消
        </Button>,
      ];
    }

    return (
      <Button type="link" onClick={() => handleUpdate(record)}>
        编辑
      </Button>
    );
  };

  const tagColumns = [
    {
      title: '分类',
      dataIndex: '_id',
      key: '_id',
    },
  ];

  const dictColumns = [
    {
      title: '配置项',
      dataIndex: 'key',
      key: 'key',
      width: '50%',
      render: (_: string, row: any) => (
        <div>
          <strong>{row.key}</strong>
          <span style={{ display: 'block', fontSize: 12 }}>{row.note}</span>
        </div>
      ),
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      width: '35%',
      align: 'center' as 'center',
      render: renderValue,
    },
    {
      title: '操作',
      key: 'operate',
      width: '15%',
      align: 'center' as 'center',
      render: renderOperate,
    },
  ];

  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={tagColumns}
      dataSource={dict}
      pagination={false}
      expandedRowRender={(tag: any) => (
        <Table
          rowKey={(record) => record._id}
          size="middle"
          columns={dictColumns}
          dataSource={tag.dict}
          pagination={false}
        />
      )}
    />
  );
}
