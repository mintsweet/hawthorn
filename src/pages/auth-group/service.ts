import http, { Response } from '@/utils/http';

export const queryAuthGroup = (params: any): Promise<Response<any>> =>
  http.get('/auth/group', params);
