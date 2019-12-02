import { message } from 'antd';
import { Http } from 'mints-utils';

let url = '';

if (process.env.NODE_ENV === 'production') {
  url = '/api';
} else {
  url = '/server/api'
}

export default new Http(url, {
  responseError(err: any) {
    const { status, data: { msg } } = err.response;
    if (status === 401) {
      (window as any).g_app._store.dispatch({
        type: 'login/logout',
      });
    }
    message.error(msg);
  }
});
