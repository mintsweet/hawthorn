import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useIntl } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import styles from './index.less';

interface Props extends React.RefAttributes<HTMLElement> {
  columns: ColumnProps<any>[];
  fetchData: (params?: object) => any;
  onDelete?: (record: any) => any;
  onUpdate?: (record: any) => any;
  customTable?: TableProps<any>;
  children?: React.ReactNode;
}

export default forwardRef(
  (
    {
      columns,
      fetchData,
      onDelete,
      onUpdate,
      customTable = {},
      children,
    }: Props,
    ref,
  ) => {
    const { formatMessage } = useIntl();
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

    useImperativeHandle(ref, () => ({
      refreshData() {
        getData();
      },
    }));

    const operateColumn: ColumnProps<any> = {
      title: formatMessage({ id: 'component.base-manage-page.operate' }),
      key: 'operate',
      align: 'center' as 'center',
      render: (_: any, record: any) => [
        <Button
          key="update"
          type="link"
          onClick={() => onUpdate && onUpdate(record)}
        >
          {formatMessage({ id: 'component.base-manage-page.operate.update' })}
        </Button>,
        <Divider key="vertical" type="vertical" />,
        <Popconfirm
          key="delete"
          title={formatMessage({
            id: 'component.base-manage-page.operate.deleteConfirm',
          })}
          onConfirm={() => onDelete && onDelete(record)}
          okText={formatMessage({
            id: 'component.base-manage-page.operate.confirm',
          })}
          cancelText={formatMessage({
            id: 'component.base-manage-page.operate.cancel',
          })}
        >
          <Button type="link" danger>
            {formatMessage({
              id: 'component.base-manage-page.operate.delete',
            })}
          </Button>
        </Popconfirm>,
      ],
    };

    if (onDelete || onUpdate) {
      columns.push(operateColumn);
    }

    return (
      <PageHeaderWrapper>
        <Card>
          <div className={styles.action}>{children}</div>
          <Table
            {...customTable}
            rowKey="_id"
            columns={columns}
            dataSource={dataSource}
            loading={loading}
          />
        </Card>
      </PageHeaderWrapper>
    );
  },
);
