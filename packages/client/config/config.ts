import { IConfig } from 'umi-types';
import routes from './router';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,

  routes,

  theme: {
    '@primary-color': '#f759ab',
  },

  outputPath: '../../build/app/public',

  manifest: {
    fileName: '../../config/manifest.json',
  },

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'Hawthorn',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],

  proxy: {
    '/server': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/server' : '' }
    },
  },
}

export default config;
