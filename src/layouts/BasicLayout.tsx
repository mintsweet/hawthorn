import React, { useEffect } from 'react';
import { Link } from 'umi';
import {
  DashboardOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import AuthStore, { SidebarItem } from '@/store/auth';

const IconMap: any = {
  dashboard: <DashboardOutlined />,
  safety: <SafetyCertificateOutlined />,
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
      menuItemRender={(itemProps, defaultDom) => (
        <Link to={itemProps.path || itemProps.itemPath}>{defaultDom}</Link>
      )}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </ProLayout>
  );
}
