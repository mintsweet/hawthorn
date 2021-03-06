export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
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
        path: '/setting',
        routes: [
          { path: '/setting', redirect: '/setting/dict' },
          { path: '/setting/info', component: './setting-info' },
          { path: '/setting/dict', component: './setting-dict' },
        ],
      },
      {
        path: '/audit-logs',
        component: './audit-logs',
      },
    ],
  },
];
