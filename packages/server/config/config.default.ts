import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    keys: `${appInfo.name}__1567071459644_5288`,
    skipAuthentication: false,
    middleware: [],
    i18n: {
      defaultLocale: 'zh-CN',
    },
    supportLang: [ 'zh-cn', 'zh-tw', 'en-us' ],
    auditLog: {
      model: {
        expansion: {
          userName: String,
        },
        func: ctx => {
          if (ctx.isAuthenticated()) {
            return {
              userName: ctx.user.username,
            };
          }
          return {};
        },
      },
    },
  };

  return config;
};
