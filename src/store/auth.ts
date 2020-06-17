import { history } from 'umi';
import { url } from 'mints-utils';
import { Rekv } from './rekv';
import * as Service from '@/services/auth';

export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  routes?: SidebarItem[];
}

export interface AuthUser {
  username: string;
}

interface AuthStore {
  status?: 'ok' | 'error';
  msg?: string;
  user?: AuthUser;
  sidebar: Array<SidebarItem>;
}

const initState: AuthStore = {
  sidebar: [],
};

export default new Rekv({
  initState,
  effects: {
    async login(store, payload) {
      const { code, msg } = await Service.login(payload);

      if (code === 0) {
        let { redirect } = url.get(window.location.href);
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

    async logout(store) {
      const { code } = await Service.logout();
      if (code === 0) {
        history.replace('/user/login');
      }
      store.setState(initState);
    },

    async getUserInfo(store) {
      const {
        code,
        data: { sidebar, ...user },
      } = await Service.getUserInfo();
      if (code !== 0) return;
      store.setState({
        user,
        sidebar,
      });
    },
  },
});
