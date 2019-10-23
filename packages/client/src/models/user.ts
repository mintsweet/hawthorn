import { Reducer } from 'redux';
import { routerRedux } from 'dva';
import { storage } from 'mints-utils';
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

export interface UserModelState {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  siderbar: Array<SiderbarItemProps>; // Record siderbar
  status: number; // Record login status
};

export interface UserModelType {
  namespce: 'user',
  state: UserModelState,
  reducers: {
    update: Reducer<UserModelState>;
  },
  effects: {
    login: Effect;
    logout: Effect;
    fetchUser: Effect;
    fetchSiderbar: Effect;
  },
};

const StateDefault = {
  id: '',
  username: '',
  nickname: '',
  avatar: '',
  siderbar: [],
  status: storage.get('loginStatus') === 'OK' ? 1 : 0,
};

const UserModel: UserModelType = {
  namespce: 'user',

  state: StateDefault,

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(AuthServices.login, payload);

      // Login status persistence
      storage.set('loginStatus', +data === 1 ? 'OK' : 'FAILED');

      yield put({
        type: 'update',
        payload: {
          status: data,
        },
      });

      if (data === 1) {
        yield put(routerRedux.replace('/'));
      }
    },

    *logout({ payload }, { call, put }) {
      if (payload) {
        yield call(AuthServices.logout);
      }

      storage.del('loginStatus');

      yield put({
        type: 'update',
        payload: {
          status: 0,
        },
      });

      yield put(routerRedux.replace('/user/login'));
    },

    *fetchUser(_, { call, put }) {
      const { data } = yield call(AuthServices.getUserInfo);
      yield put({
        type: 'update',
        payload: {
          ...data,
        },
      });
    },

    *fetchSiderbar(_, { call, put }) {
      const { data } = yield call(AuthServices.getSiderbar);
      yield put({
        type: 'update',
        payload: {
          siderbar: data,
        },
      });
    },
  },
};

export default UserModel;
