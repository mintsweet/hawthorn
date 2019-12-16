import { Reducer } from 'redux';
import * as AuthService from '@/services/auth';
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
  passwordStrength: string;
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
    updateUser: Effect;
    updatePass: Effect;
  },
};

const StateDefault = {
  id: '',
  username: '',
  nickname: '',
  avatar: '',
  passwordStrength: 'weak',
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
      const { data } = yield call(AuthService.getUserInfo);
      yield put({
        type: 'update',
        payload: {
          ...data,
        },
      });
    },
    *updateUser({ payload }, { call, put }) {
      const { data } = yield call(AuthService.updateUserInfo, payload);
      yield put({
        type: 'update',
        payload: {
          ...data,
        },
      });
    },
    *updatePass({ payload }, { call, put }) {
      const { data } = yield call(AuthService.updateUserPassword, payload);
      yield put({
        type: 'update',
        payload: {
          ...data,
        },
      });
    },
  },
};

export default UserModel;
