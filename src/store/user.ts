import { history } from 'umi';
import { url } from 'mints-utils';
import { Rekv } from './rekv';
import * as Service from '@/services/user';

export interface User {
  email: string;
}

interface UserStore {
  status?: 'ok' | 'error';
  msg?: string;
  user?: User;
}

const initState: UserStore = {};

export default new Rekv({
  initState,
  effects: {
    async signup() {},

    async signin(store, payload) {
      const { code, msg } = await Service.signin(payload);

      if (code === 0) {
        let { redirect }: any = url.get(window.location.href);
        redirect = redirect
          ? redirect.substr(window.location.href.length)
          : '/';
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
        history.replace(redirect);
      }

      store.setState({
        status: code === 0 ? 'ok' : 'error',
        msg,
      });
    },

    async signout() {},

    async getUserInfo() {},
  },
});
