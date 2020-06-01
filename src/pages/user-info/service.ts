import http, { Response } from '@/utils/http';

export const updatePass = (data: object): Promise<Response<any>> =>
  http.put('/auth/password', data);
