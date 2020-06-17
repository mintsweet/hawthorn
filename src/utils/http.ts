import { Http } from 'mints-utils';
import { formatMessage } from 'umi';
import { notification, message } from 'antd';

export interface Response<T> {
  msg: string;
  code: number;
  data: T;
}

export default new Http('/api', {
  responseError: (err: any) => {
    const { status } = err.response;
    if (status >= 500) {
      notification.error({
        message: formatMessage({ id: 'error.5xx' }),
        description: formatMessage({ id: 'error.5xx.desc' }),
      });
    }

    if (status === 401) {
      notification.error({
        message: formatMessage({ id: 'error.401' }),
        description: formatMessage({ id: 'error.401.desc' }),
      });

      setTimeout(() => {
        window.location.href = `/user/login?redirect=${
          window.location.href || ''
        }`;
      }, 1000);
    }
  },
});
