import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  locale: { antd: true },
  routes,
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
