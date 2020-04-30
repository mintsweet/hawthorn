import React, { useEffect } from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import AuthStore, { SidebarItem } from '@/store/auth';

const IconMap: any = {
  dashboard: <DashboardOutlined />,
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
    };
  });
};

export default function BasicLayout({ children }: any) {
  const sidebar = AuthStore.useState('sidebar');

  useEffect(() => {
    AuthStore.dispatch('getSidebar');
  }, []);

  return (
    <ProLayout
      title="Hawthorn"
      menuDataRender={(routes: MenuDataItem[]) =>
        menuDataRender(routes, sidebar)
      }
      style={{ minHeight: '100vh' }}
    >
      {children}
    </ProLayout>
  );
}
