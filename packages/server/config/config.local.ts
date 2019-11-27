import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
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
        password: 'auth',
        db: 3,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  };
  return config;
};
