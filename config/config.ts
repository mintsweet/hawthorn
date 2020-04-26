import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  locale: { antd: true },
  routes,
});
