import http from './utils';

// 获取用户菜单列表
export const getSiderbar = () => http.get('/v1/siderbar');

// 获取用户信息
export const getUser = () => http.get('/v1/user');

/**
 * 基础权限
 */
export const getSystemTree = () => http.get('/api/v1/auth/system-tree');

/**
 * 权限组
 */
export const createGroup = (data: object) => http.post('/api/v1/auth/group', data);
export const deleteGroup = (id: string) => http.del(`/api/v1/auth/group/${id}`);
export const updateGroup = (id: string, data: object) => http.put(`/api/v1/auth/group/${id}`, data);
export const getGroups = (param: object) => http.get('/api/v1/auth/groups', param);
export const getGroup = (id: string) => http.get(`/api/v1/auth/group/${id}`);
