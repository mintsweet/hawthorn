import { Reducer } from 'redux';
import { storage } from 'mints-utils';

export interface GlobalModelState {
  collapsed: boolean;
  autoLogin: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    changeAutoLogin: Reducer<GlobalModelState>;
  };
}

const StateDefault = {
  collapsed: false,
  autoLogin: storage.get('autoLogin') === 'ON' ? true : false,
  siderbar: [],
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: StateDefault,

  reducers: {
    changeLayoutCollapsed(state = StateDefault, { payload }) {
      return { ...state, collapsed: payload };
    },

    changeAutoLogin(state = StateDefault, { payload }) {
      storage.set('autoLogin', payload ? 'ON' : 'OFF');
      return { ...state, autoLogin: payload };
    },
  },
}

export default GlobalModel;
