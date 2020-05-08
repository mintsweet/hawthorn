// import { history } from 'umi';
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
  user: AuthUser;
  sidebar: Array<SidebarItem>;
}

const initState: AuthStore = {
  user: {},
  sidebar: [],
};

export default new Rekv({
  initState,
  effects: {
    async login(store, payload) {
      const { code, msg } = await Service.login(payload);
      store.setState({
        status: code === 0 ? 'ok' : 'error',
        msg,
      });
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
