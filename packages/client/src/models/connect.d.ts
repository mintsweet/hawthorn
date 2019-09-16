import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface ConnectState {
  global: GlobalModelState;
}

export interface ConnectProps<T extends { [key: string]: any } = {}>{
  dispatch: Dispatch;
}
