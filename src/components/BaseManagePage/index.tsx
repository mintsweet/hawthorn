import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from './index.less';

interface Props {
  columns: ColumnProps<any>[];
  fetchData: (params?: object) => any;
  children: React.ReactNode;
}

export default function BaseManagePage({
  columns,
  fetchData,
  children,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);

  const getData = async (condition = {}) => {
    setLoading(true);
    const { data } = await fetchData({
      page,
      size,
      ...condition,
    });

    setDataSource(data.list);
    setTotal(data.total);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <div className={styles.action}>{children}</div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
