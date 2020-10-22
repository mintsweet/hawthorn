import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import classNames from 'classnames';
import { List, Avatar, Tooltip, Divider } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { format } from 'mints-utils';
import * as Service from './service';
import styles from './index.less';

const basicTabs = [
  { name: '全部', mark: 'all' },
  { name: '精华', mark: 'good' },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [topics, setTopics] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Service.queryTab();
      setTabs(data);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await Service.queryTopics({ tab: activeTab });
      setTopics(data.list);
      setTotal(data.total);
      setLoading(false);
    };

    getData();
  }, [activeTab]);

  return [
    <ul key="tabs" className={styles.tabs}>
      {basicTabs.concat(tabs).map((item) => (
        <li
          className={classNames({ [styles.active]: activeTab === item.mark })}
          key={item.mark}
          onClick={() => setActiveTab(item.mark)}
        >
          {item.name}
        </li>
      ))}
    </ul>,
    <List
      key="topics"
      itemLayout="horizontal"
      loading={loading}
      dataSource={topics}
      pagination={{
        total,
      }}
      renderItem={(item: any) => (
        <List.Item
          actions={[<span>{format.date(item.created_at).fromNow()}</span>]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.author_avatar} />}
            title={<Link to={`/client/topic/${item._id}`}>{item.title}</Link>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <div className={styles.statistics}>
            <Tooltip title="浏览数">
              <span>
                <EyeOutlined />
                100
              </span>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="点赞数">
              <span>
                <LikeOutlined />
                18
              </span>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="回复数">
              <span>
                <MessageOutlined />1
              </span>
            </Tooltip>
          </div>
        </List.Item>
      )}
    />,
  ];
}
