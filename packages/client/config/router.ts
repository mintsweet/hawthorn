export default [
  {
    path: '/user',
    component: '../layouts/user',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/basic',
    routes: [
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        component: './dashboard',
      },
      {
        path: '/auth',
        routes: [
          { path: '/auth', redirect: '/auth/group' },
          { path: '/auth/group', component: './auth-group' },
          { path: '/auth/user', component: './auth-user' },
        ],
      },
      {
        path: '/system',
        routes: [
          { path: '/system', redirect: '/system/config' },
          { path: '/system/config', component: './system-config' },
        ],
      },
      {
        path: '/audit-logs',
        component: './audit-logs',
      },
    ],
  },
];
