import http, { Response } from '@/utils/http';

export const login = (params: any): Promise<Response<any>> =>
  http.post('/auth/login', params);

export const getUserInfo = (): Promise<Response<any>> => http.get('/auth/info');
