export default [
  {
    path: '/dashboard',
    icon: 'dashboard',
    menu: true,
  },
  {
    path: '/auth',
    icon: 'safety',
    menu: true,
    routes: [
      {
        path: '/auth/group',
        menu: true,
        routes: [
          { path: '/auth/group/create' },
          { path: '/auth/group/delete' },
          { path: '/auth/group/update' },
        ],
      },
      {
        path: '/auth/user',
        menu: true,
        routes: [
          { path: '/auth/user/create' },
          { path: '/auth/user/delete' },
          { path: '/auth/user/update' },
        ],
      },
    ],
  },
  {
    path: '/setting',
    icon: 'setting',
    menu: true,
    routes: [
      {
        path: '/setting/info',
        menu: true,
      },
      {
        path: '/setting/dict',
        menu: true,
      },
    ],
  },
  {
    path: '/audit-logs',
    icon: 'tags',
    menu: true,
  },
];
