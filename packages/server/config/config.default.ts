import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    keys: `${appInfo.name}__1567071459644_5288`,
    saltPassword: 'hawthorn',
    middleware: [],
    mongoose: {
      url: 'mongodb://localhost:27017/hawthorn',
      options: {
        useUnifiedTopology: true,
      },
    },
    i18n: {
      defaultLocale: 'zh-CN',
    },
    supportLang: [
      'zh-cn',
      'en-us',
    ],
    session: {
      maxAge: 3600 * 1000 * 24,
    },
    auditLog: {
      model: {
        expansion: {
          userId: {
            type: String,
            default: '',
          },
          userName: {
            type: String,
            default: '',
          },
        },
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 3,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  } as PowerPartial<EggAppConfig>;

  return config;
};
