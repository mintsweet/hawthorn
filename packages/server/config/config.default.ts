import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    keys: `${appInfo.name}__1567071459644_5288`,
    middleware: [],

    mongoose: {
      url: 'mongodb://localhost:27017/hawthorn',
    },

    security: {
      csrf: {
        enable: false,
      },
    },
  } as PowerPartial<EggAppConfig>;

  return config;
};
