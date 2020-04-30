import { Rekv } from './rekv';
import * as Service from '@/services/auth';

export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  children?: SidebarItem[];
}

export interface AuthModuleItem {
  name: string;
  icon: string;
  path: string;
  menu: boolean;
}

interface AuthStore {
  sidebar: Array<SidebarItem>;
}

const initState: AuthStore = {
  sidebar: [],
};

const convert = (data: AuthModuleItem[]): SidebarItem[] => {
  let result: SidebarItem[] = [];
  data.forEach((i) => {
    result.push({
      name: i.name,
      path: i.path,
      icon: i.icon,
    });
  });
  return result;
};

export default new Rekv({
  initState,
  effects: {
    async getSidebar(store) {
      const { code, data } = await Service.getSiderbar();
      if (code !== 0) return;
      const sidebar = convert(data.filter((bar) => bar.menu));
      store.setState({
        sidebar,
      });
    },
  },
});
