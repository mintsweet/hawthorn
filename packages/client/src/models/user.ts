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
  status: 'OK' | 'FAILED'; // Record login status
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
  status: storage.get('loginStatus'),
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
      const { code, data: { uri } } = yield call(AuthServices.login, payload);
      const loginStatus = code === 0 ? 'OK' : 'FAILED';

      // Login status persistence
      storage.set('loginStatus', loginStatus);

      yield put({
        type: 'update',
        payload: {
          status: loginStatus,
        },
      });

      if (code === 0) {
        const redirect = uri || '/';
        yield put(routerRedux.replace(redirect));
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
