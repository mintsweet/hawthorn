import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  locale: { antd: true },
  routes,
});
