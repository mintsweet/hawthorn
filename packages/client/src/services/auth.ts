import http from '@/utils/http';

/**
 * 基础权限
 */
export const login = (data: object) => http.post('/v1/login', data);
export const logout = () => http.post('/v1/logout');
export const getUserInfo = () => http.get('/v1/info');
export const updateUserInfo = (data: object) => http.put('/v1/info');

/**
 * 用户
 */
export const createUser = (data: object) => http.post('/v1/auth/user', data);
export const deleteUser = (id: string) => http.del(`/v1/auth/user/${id}`);
export const updateUser = (id: string, data: object) => http.put(`/v1/auth/user/${id}`, data);
export const getUsers = (params: object) => http.get('/v1/auth/users', params);
export const getUser = (id: string) => http.get(`/v1/auth/user/${id}`);

/**
 * 权限组
 */
export const createGroup = (data: object) => http.post('/v1/auth/group', data);
export const deleteGroup = (id: string) => http.del(`/v1/auth/group/${id}`);
export const updateGroup = (id: string, data: object) => http.put(`/v1/auth/group/${id}`, data);
export const getGroups = (param: object) => http.get('/v1/auth/groups', param);
export const searchGroup = (param?: object) => http.get('/v1/auth/groups/search', param);
export const getSystemTree = () => http.get('/v1/auth/system-tree');
