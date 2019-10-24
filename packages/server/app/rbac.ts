export default [
  {
    name: '系统概览',
    path: '/dashboard',
    icon: 'dashboard',
  },
  {
    name: '权限管理',
    path: '/auth',
    icon: 'safety',
    routes: [
      {
        name: '权限组',
        path: '/auth/group',
      },
      {
        name: '用户列表',
        path: '/auth/user',
      },
    ],
  },
  {
    name: '站点配置',
    path: '/setting',
    icon: 'setting',
    routes: [
      {
        name: '基础配置',
        path: '/setting/basic',
      },
      {
        name: '邮箱配置',
        path: '/setting/email',
      },
    ],
  },
];
