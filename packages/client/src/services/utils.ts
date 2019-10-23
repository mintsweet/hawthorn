import { message } from 'antd';
import { Http } from 'mints-utils';

export default new Http('/api', {
  responseError(err: any) {
    if (err.response.status === 401) {
      (window as any).g_app._store.dispatch({
        type: 'user/logout',
      });
      message.error(err.response.data);
    }
  }
});
