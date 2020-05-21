import http, { Response } from '@/utils/http';

export const queryAuthUser = (params: any): Promise<Response<any>> =>
  http.get('/auth/user', params);

export const createAuthUser = (params: any): Promise<Response<any>> =>
  http.post('/auth/user', params);
