import { Reducer } from 'redux';

export interface GlobalModelState {
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return { ...state, collapsed: payload };
    },
  },
}

export default GlobalModel;
