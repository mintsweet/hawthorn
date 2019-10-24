export default key => async (ctx, next) => {
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

  if (!permissions.includes(key)) {
    return ctx.forbidden({
      data,
    });
  }

  return await next();
};
