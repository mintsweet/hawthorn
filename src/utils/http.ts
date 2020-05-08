import { Http } from 'mints-utils';

export interface Response<T> {
  msg: string;
  code: number;
  data: T;
}

export default new Http('/api', {
  responseError: (err: any) => {
    if (err.response.status === 401) {
      window.location.href = `/user/login?redirect=${
        window.location.href || ''
      }`;
    }
  },
});
