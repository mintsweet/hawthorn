import { message } from 'antd';
import { Http } from 'mints-utils';

export default new Http('/server/api', {
  responseError(err: any) {
    const { status, data: { msg } } = err.response;
    if (status === 401) {
      (window as any).g_app._store.dispatch({
        type: 'user/logout',
      });
    }
    message.error(msg);
  }
});
