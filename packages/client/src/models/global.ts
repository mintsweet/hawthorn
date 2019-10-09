import { Reducer } from 'redux';
import { Effect } from './connect';
import * as AuthServices from '@/services/auth';

export interface SiderbarItemProps {
  name: string;
  icon?: string;
  path: string;
  routes?: Array<SiderbarItemProps>;
  hideInMenu?: boolean;
  target?: string;
};

export interface GlobalModelState {
  collapsed: boolean;
  siderbar: Array<SiderbarItemProps>;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    update: Reducer<GlobalModelState>;
  };
  effects: {
    fetchSiderbar: Effect;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    siderbar: [],
  },

  reducers: {
    changeLayoutCollapsed(state = { collapsed: false, siderbar: [] }, { payload }) {
      return { ...state, collapsed: payload };
    },

    update(state = { collapsed: false, siderbar: [] }, { payload }) {
      return { ...state, siderbar: payload };
    },
  },

  effects: {
    *fetchSiderbar(_, { call, put }) {
      const { data } = yield call(AuthServices.getSiderbar);
      yield put({
        type: 'update',
        payload: data,
      });
    },
  },
}

export default GlobalModel;
