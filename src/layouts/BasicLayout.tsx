import React, { useEffect } from 'react';
import { Link } from 'umi';
import {
  DashboardOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UserOutlined,
  TagOutlined,
} from '@ant-design/icons';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import RightContent from '../components/GlobalHeader/RightContent';
import AuthStore, { SidebarItem } from '@/store/auth';

const IconMap: any = {
  dashboard: <DashboardOutlined />,
  safety: <SafetyCertificateOutlined />,
  setting: <SettingOutlined />,
  user: <UserOutlined />,
  tag: <TagOutlined />,
};

const menuDataRender = (
  routes: MenuDataItem[],
  sidebar: SidebarItem[],
): MenuDataItem[] => {
  return sidebar.map((i) => {
    return {
      path: i.path,
      name: i.name,
      icon: i.icon && IconMap[i.icon],
      children: i.routes,
    };
  });
};

export default function BasicLayout({ children }: any) {
  const sidebar = AuthStore.useState('sidebar');

  useEffect(() => {
    AuthStore.dispatch('getUserInfo');
  }, []);

  return (
    <ProLayout
      title="Hawthorn"
      menuDataRender={(routes: MenuDataItem[]) =>
        menuDataRender(routes, sidebar)
      }
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          menuItemProps.children ||
          !menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      rightContentRender={() => <RightContent />}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </ProLayout>
  );
}
