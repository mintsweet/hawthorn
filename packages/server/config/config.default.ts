import * as path from 'path';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    keys: `${appInfo.name}__1567071459644_5288`,
    skipAuthentication: false,
    middleware: [],
    saltPassword: 'hawthorn',
    session: {
      maxAge: 3600 * 1000 * 24,
    },
    mongoose: {
      url: 'mongodb://localhost:27017/hawthorn',
      options: {
        useUnifiedTopology: true,
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 3,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
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
    view: {
      mapping: {
        '.html': 'nunjucks',
      },
    },
    assets: {
      publicPath: '/public/',
      devServer: {
        debug: true,
        command: 'umi dev --port=4255',
        port: 4255,
        env: {
          APP_ROOT: path.join(appInfo.baseDir, '../client'),
          BROWSER: 'none',
          SOCKET_SERVER: 'http://127.0.0.1:4255',
        },
      },
    },
  };

  return config;
};
