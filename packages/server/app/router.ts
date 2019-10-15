import { Application } from 'egg';

export default (app: Application) => {
  // const { auth } = app.middleware;

  /**
   * 基础权限
   */
  app.get('/api/v1/auth/system-tree', 'auth.basic.systemTree'); // 获取权限树
  app.get('/api/v1/auth/login', 'auth.basic.login'); // 登录
  app.get('/api/v1/auth/logout', 'auth.basic.logout'); // 登出
  app.get('/api/v1/auth/info', 'auth.basic.userInfo'); // 获取用户信息

  /**
   * 用户
   */
  app.get('/api/v1/auth/users', 'auth.user.index');
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
};
