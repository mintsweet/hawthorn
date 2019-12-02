import 'tsconfig-paths/register';
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  auditLog: {
    enable: true,
    package: 'egg-audit-log',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  assets: {
    enable: true,
    package: 'egg-view-assets',
  },
};

export default plugin;
