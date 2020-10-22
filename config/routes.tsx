export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './user-login' },
    ],
  },
  {
    path: '/client',
    component: '../layouts/ClientLayout',
    routes: [
      { path: '/client', component: './home' },
      { path: '/client/signup', component: './signup' },
      { path: '/client/signin', component: './signin' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', component: './dashboard' },
      {
        path: '/auth',
        routes: [
          { path: '/auth', redirect: '/auth/group' },
          { path: '/auth/group', component: './auth-group' },
          { path: '/auth/user', component: './auth-user' },
        ],
      },
      { path: '/dict', component: './dict' },
      { path: '/user-info', component: './user-info' },
      { path: '/audit-log', component: './audit-log' },
    ],
  },
];
