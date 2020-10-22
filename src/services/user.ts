import http, { Response } from '@/utils/http';

export const signup = (data: any): Promise<Response<any>> =>
  http.post('/signup', data);

export const signin = (data: any): Promise<Response<any>> =>
  http.post('/signin', data);

export const signout = (): Promise<Response<any>> => http.post('/signout');

export const getUserInfo = (): Promise<Response<any>> => http.get('/info');
