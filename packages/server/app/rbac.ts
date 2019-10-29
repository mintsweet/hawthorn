export default [
  {
    name: '系统概览',
    path: '/dashboard',
    icon: 'dashboard',
    menu: true,
  },
  {
    name: '权限管理',
    path: '/auth',
    icon: 'safety',
    menu: true,
    routes: [
      {
        name: '权限组',
        path: '/auth/group',
        menu: true,
        routes: [
          { name: '查看', path: '/auth/group/query' },
          { name: '新增', path: '/auth/group/create' },
          { name: '删除', path: '/auth/group/delete' },
          { name: '修改', path: '/auth/group/update' },
        ],
      },
      {
        name: '用户列表',
        path: '/auth/user',
        menu: true,
        routes: [
          { name: '查看', path: '/auth/user/query' },
          { name: '新增', path: '/auth/user/create' },
          { name: '删除', path: '/auth/user/delete' },
          { name: '修改', path: '/auth/user/update' },
        ],
      },
    ],
  },
  {
    name: '系统设置',
    path: '/system',
    icon: 'setting',
    menu: true,
    routes: [
      {
        name: '参数配置',
        path: '/system/config',
        menu: true,
      },
    ],
  },
  {
    name: '日志管理',
    path: '/audit-logs',
    icon: 'tags',
    menu: true,
  },
];
