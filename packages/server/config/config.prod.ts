import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    static: {
      prefix: '/',
    },
    mongoose: {
      url: 'mongodb://hawthorn-mongo:27017/hawthorn',
      options: {
        useUnifiedTopology: true,
      },
    },
    redis: {
      client: {
        port: 6379,
        host: 'hawthorn-redis',
        password: '',
        db: 3,
      },
    },
  };
  return config;
};
