import { Http } from 'mints-utils';

const http = new Http('/api');

// 获取用户菜单列表
export const getSiderbar = () => http.get('/v1/siderbar');

// 获取用户信息
export const getUser = () => http.get('/v1/user');
