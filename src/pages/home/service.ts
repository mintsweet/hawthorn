import http, { Response } from '@/utils/http';

export const queryTab = (): Promise<Response<any>> => http.get('/tabs');

export const queryTopics = (params: object): Promise<Response<any>> =>
  http.get('/topics', params);
