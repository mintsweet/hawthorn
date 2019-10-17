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
          { path: '/auth', redirect: '/auth/user' },
          { path: '/auth/group', component: './auth-group' },
          { path: '/auth/user', component: './auth-user' },
        ],
      },
      {
        path: '/setting',
        routes: [
          { path: '/setting', redirect: '/setting/basic' },
          { path: '/setting/basic', component: './setting-basic' },
          { path: '/setting/email', component: './setting-email' },
        ],
      },
    ],
  },
];
