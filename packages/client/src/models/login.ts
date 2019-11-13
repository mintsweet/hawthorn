import { Reducer } from 'redux';
import { routerRedux } from 'dva';
import { storage } from 'mints-utils';
import * as AuthServices from '@/services/auth';
import { Effect } from './connect';

export interface LoginModelState {
  loading: boolean; // Record doing
  status: 'OK' | 'FAILED'; // Record login status
};

export interface LoginModelType  {
  namespace: 'login',
  state: LoginModelState,
  reducers: {
    update: Reducer<LoginModelState>;
  },
  effects: {
    login: Effect;
    logout: Effect;
  },
};

const StateDefault = {
  loading: false,
  status: storage.get('loginStatus'),
};

const LoginModel: LoginModelType = {
  namespace: 'login',

  state: StateDefault,

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'update',
        payload: {
          loading: true,
        },
      });

      try {
        const { data: { uri } } = yield call(AuthServices.login, payload);
        // Login status persistence
        storage.set('loginStatus', 'OK');

        yield put({
          type: 'update',
          payload: {
            status: 'OK',
            loading: false,
          },
        });

        const redirect = uri || '/';
        yield put(routerRedux.replace(redirect));
      } catch(err) {
        yield put({
          type: 'update',
          payload: {
            status: 'FAILED',
            loading: false,
          },
        });
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
  },
};

export default LoginModel;
