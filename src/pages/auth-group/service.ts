import http, { Response } from '@/utils/http';

export const queryAuthGroup = (params: any): Promise<Response<any>> =>
  http.get('/auth/group', params);

export const querySystemTree = (): Promise<Response<any>> =>
  http.get('/auth/system-tree');

export const createAuthGroup = (data: any): Promise<Response<any>> =>
  http.post('/auth/group', data);
