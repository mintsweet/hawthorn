export default (key: string | string[]) => async (ctx, next) => {
  // 开发模式跳过权限检查
  const { config } = ctx.app;
  if (config.skipAuthentication) {
    return await next();
  }

  const data = {
    role: key,
    userId: ctx.user ? ctx.user._id : '',
  };

  if (!ctx.isAuthenticated()) {
    return ctx.unAuthorized({
      data,
    });
 }

  const { permissions } = ctx.user;

  if (typeof key !== 'string' || Array.isArray(key)) {
    return ctx.badRequest({
      data,
    });
  }

  if (typeof key === 'string' && !permissions.includes(`/${key.split('.').join('/')}`)) {
    return ctx.forbidden({
      data,
    });
  }

  if (Array.isArray(key) && !key.find(item => permissions.includes(`/${item.split('.').join('/')}`))) {
    return ctx.forbidden({
      data,
    });
  }

  return await next();
};
