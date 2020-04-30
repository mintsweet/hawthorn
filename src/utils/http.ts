import { Http } from 'mints-utils';

export interface Response<T> {
  msg: string;
  code: number;
  data: T;
}

export default new Http('/');
