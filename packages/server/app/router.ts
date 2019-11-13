import { Application } from 'egg';

export default (app: Application) => {
  const { auth } = app.middleware;

  /**
   * 基础权限
   */
  app.post('/api/v1/login', 'auth.basic.login'); // 登录
  app.post('/api/v1/logout', 'auth.basic.logout'); // 登出
  app.get('/api/v1/info', 'auth.basic.userInfo'); // 获取用户信息

  /**
   * 权限 - 权限组
   */
  app.get('/api/v1/auth/groups', auth('auth.group.query'), 'auth.group.query');
  app.post('/api/v1/auth/group', auth('auth.group.create'), 'auth.group.create');
  app.delete('/api/v1/auth/group/:id', auth('auth.group.delete'), 'auth.group.delete');
  app.put('/api/v1/auth/group/:id', auth('auth.group.update'), 'auth.group.update');
  app.get('/api/v1/auth/groups/search', auth('auth.group.query'), 'auth.group.search');
  app.get('/api/v1/auth/system-tree', auth([ 'auth.group.create', 'auth.group.update' ]), 'auth.group.systemTree'); // 获取权限树

  /**
   * 权限 - 用户
   */
  app.get('/api/v1/auth/users', auth('auth.user.query'), 'auth.user.query');
  app.post('/api/v1/auth/user', auth('auth.user.create'), 'auth.user.create');
  app.delete('/api/v1/auth/user/:id', auth('auth.user.delete'), 'auth.user.delete');
  app.put('/api/v1/auth/user/:id', auth('auth.user.update'), 'auth.user.update');
  app.get('/api/v1/auth/user/:id', auth('auth.user.get'), 'auth.user.get');
  app.get('/api/v1/auth/users/search', auth('auth.user.query'), 'auth.user.search');

  /**
   * 设置 - 字典
   */
  app.get('/api/v1/setting/dicts', auth('setting.dict'), 'setting.dict.query');
  app.get('/api/v1/setting/dict/:key', auth('setting.dict'), 'setting.dict.get');
  app.put('/api/v1/setting/dict/:key', auth('setting.dict'), 'setting.dict.update');

  /**
   * 日志
   */
  app.get('/api/v1/audit-logs', auth('audit-logs'), 'auditLog.query');
};
