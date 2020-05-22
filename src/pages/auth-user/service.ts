import http, { Response } from '@/utils/http';

export const queryAuthUser = (params: any): Promise<Response<any>> =>
  http.get('/auth/user', params);

export const createAuthUser = (data: any): Promise<Response<any>> =>
  http.post('/auth/user', data);

export const deleteAuthUser = (id: string): Promise<Response<any>> =>
  http.del(`/auth/user/${id}`);

export const updateAuthUser = (id: string, data: any): Promise<Response<any>> =>
  http.put(`/auth/user/${id}`, data);
