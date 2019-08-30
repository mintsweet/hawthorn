import { Application } from 'egg';

export default (app: Application) => {
  /**
   * 用户
   */
  app.get('/api/auth/users', 'auth.user.index');
  app.post('/api/auth/user', 'auth.user.create');
  app.delete('/api/auth/user/:id', 'auth.user.delete');
  app.put('/api/auth/user/:id', 'auth.user.update');
  app.get('/api/auth/user/:id', 'auth.user.get');
  app.get('/api/auth/users/search', 'auth.user.search');
};
