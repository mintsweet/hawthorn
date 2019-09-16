export const getSiderbar = () => {
  return {
    data: [
      {
        name: '权限管理',
        icon: 'user',
        path: '/auth',
        routes: [
          {
            name: '测试子菜单一',
            path: '/auth/children-1'
          },
        ],
      },
      {
        name: '系统设置',
        icon: 'setting',
        path: '/setting'
      },
    ]
  };
}
