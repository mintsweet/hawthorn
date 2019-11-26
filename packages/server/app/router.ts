import { Application } from 'egg';

export default (app: Application) => {
  const { auth } = app.middleware;
  const { middleware: log } = app.auditLog;

  /**
   * 公共路由
   */
  app.put('/api/v1/lang', 'common.updateLang'); // 更新语言

  /**
   * 基础权限
   */
  app.post('/api/v1/login', 'auth.basic.login'); // 登录
  app.post('/api/v1/logout', 'auth.basic.logout'); // 登出
  app.get('/api/v1/info', 'auth.basic.getUserInfo'); // 获取用户信息
  app.put('/api/v1/info', 'auth.basic.updateUserInfo'); // 更新用户信息
  app.put('/api/v1/password', 'auth.basic.updateUserPassword'); // 更新用户密码

  /**
   * 权限 - 权限组
   */
  app.get('/api/v1/auth/system-tree', auth([ 'auth.group.create', 'auth.group.update' ]), 'auth.group.systemTree'); // 获取权限树
  app.get('/api/v1/auth/groups', auth('auth.group.query'), 'auth.group.query');
  app.post('/api/v1/auth/group', auth('auth.group.create'), log('Auth', 'Create Auth Group'), 'auth.group.create');
  app.delete('/api/v1/auth/group/:id', auth('auth.group.delete'), log('Auth', 'Delete Auth Group'), 'auth.group.delete');
  app.put('/api/v1/auth/group/:id', auth('auth.group.update'), log('Auth', 'Update Auth Group'), 'auth.group.update');
  app.get('/api/v1/auth/groups/search', auth('auth.group.query'), 'auth.group.search');

  /**
   * 权限 - 用户
   */
  app.get('/api/v1/auth/users', auth('auth.user.query'), 'auth.user.query');
  app.post('/api/v1/auth/user', auth('auth.user.create'), log('Auth', 'Create Auth User'), 'auth.user.create');
  app.delete('/api/v1/auth/user/:id', auth('auth.user.delete'), log('Auth', 'Delete Auth User'), 'auth.user.delete');
  app.put('/api/v1/auth/user/:id', auth('auth.user.update'), log('Auth', 'Update Auth User'), 'auth.user.update');

  /**
   * 设置 - 字典
   */
  app.get('/api/v1/setting/dicts', auth('setting.dict'), 'setting.dict.query');
  app.get('/api/v1/setting/dict/:key', auth('setting.dict'), 'setting.dict.get');
  app.put('/api/v1/setting/dict/:key', auth('setting.dict'), log('Setting', 'Update Dict'), 'setting.dict.update');

  /**
   * 日志
   */
  app.get('/api/v1/audit-logs', auth('audit-logs'), 'auditLog.query');
};
