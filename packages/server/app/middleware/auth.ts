export default key => async (ctx, next) => {
 // 开发模式跳过权限检查
 const { config } = ctx.app;
 if (config.skipAuthentication) {
   await next();
   return;
 } else {
   console.log(key);
   await next();
 }
};
