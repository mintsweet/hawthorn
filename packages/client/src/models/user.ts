import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
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
    fetchUser: Effect;
    fetchSiderbar: Effect;
  },
};

const UserModel: UserModelType = {
  namespce: 'user',

  state: {
    id: '',
    username: '',
    nickname: '',
    avatar: '',
    siderbar: [],
    status: 0,
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(AuthServices.login, payload);
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
