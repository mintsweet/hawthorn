export default {
  'GET /api/v1/siderbar': {
    data: [
      {
        name: '系统概览',
        icon: 'dashboard',
        path: '/dashboard',
      },
      {
        name: '权限管理',
        icon: 'user',
        path: '/auth',
        routes: [
          {
            name: '用户列表',
            path: '/auth/user',
          },
          {
            name: '权限组',
            path: '/auth/group',
          },
        ],
      },
      {
        name: '站点配置',
        icon: 'setting',
        path: '/setting',
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
    ]
  },

  'GET /api/v1/user': {
    data: {
      nickname: '青湛',
      avatar: 'http://iph.href.lu/200x200?text=avatar',
    },
  },
}
