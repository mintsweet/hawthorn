import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    static: {
      prefix: '/',
    },
  };
  return config;
};
