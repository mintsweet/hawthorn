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
    ],
  },
];
