import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,

  routes: [
    {
      path: '/user',
      component: '../layout/user',
      routes: [
        {
          path: '/user/login',
          component: '../layout/login',
        },
        {
          path: '/user/forget_pass',
          component: '../layout/forget-pass',
        },
      ],
    },
    {
      path: '/dashboard',
      component: '../layouts/basic',
      routes: [
        {
          path: '/dashboard',
          component: './dashboard',
        },
      ],
    },
    {
      path: '/auth',
      component: '../layouts/basic',
      routes: [
        {
          path: '/auth/user',
          component: './auth-user',
        },
      ],
    },
  ],

  theme: {
    '@primary-color': '#f759ab',
  },

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'client',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
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
}

export default config;
