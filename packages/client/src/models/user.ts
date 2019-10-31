import { Reducer } from 'redux';
import * as AuthServices from '@/services/auth';
import { Effect } from './connect';

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
  permissions: string[];
  siderbar: Array<SiderbarItemProps>; // Record siderbar
};

export interface UserModelType {
  namespce: 'user',
  state: UserModelState,
  reducers: {
    update: Reducer<UserModelState>;
  },
  effects: {
    fetchUser: Effect;
    fetchSiderbar: Effect;
  },
};

const StateDefault = {
  id: '',
  username: '',
  nickname: '',
  avatar: '',
  permissions: [],
  siderbar: [],
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
