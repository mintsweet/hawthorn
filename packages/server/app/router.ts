import { Application } from 'egg';

export default (app: Application) => {
  // const { auth } = app.middleware;

  /**
   * 基础权限
   */
  app.get('/api/v1/auth/system-tree', 'auth.basic.systemTree');

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
