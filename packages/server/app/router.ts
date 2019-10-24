import { Application } from 'egg';

export default (app: Application) => {
  const { auth } = app.middleware;

  /**
   * 基础权限
   */
  app.post('/api/v1/login', 'auth.basic.login'); // 登录
  app.post('/api/v1/logout', 'auth.basic.logout'); // 登出
  app.get('/api/v1/info', 'auth.basic.userInfo'); // 获取用户信息
  app.get('/api/v1/siderbar', 'auth.basic.siderbar'); // 获取用户菜单信息

  /**
   * 用户
   */
  app.get('/api/v1/auth/users', auth('/auth/user'), 'auth.user.index');
  app.post('/api/v1/auth/user', 'auth.user.create');
  app.delete('/api/v1/auth/user/:id', 'auth.user.delete');
  app.put('/api/v1/auth/user/:id', 'auth.user.update');
  app.get('/api/v1/auth/user/:id', 'auth.user.get');
  app.get('/api/v1/auth/users/search', 'auth.user.search');

  /**
   * 权限组
   */
  app.get('/api/v1/auth/groups', 'auth.group.index');
  app.post('/api/v1/auth/group', 'auth.group.create');
  app.delete('/api/v1/auth/group/:id', 'auth.group.delete');
  app.put('/api/v1/auth/group/:id', 'auth.group.update');
  app.get('/api/v1/auth/system-tree', auth('/auth/group'), 'auth.basic.systemTree'); // 获取权限树
};
