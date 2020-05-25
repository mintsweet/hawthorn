import http, { Response } from '@/utils/http';

export const queryDict = (): Promise<Response<any>> => http.get('/dict');

export const updateDict = (key: string, data: object): Promise<Response<any>> =>
  http.put(`/dict/${key}`, data);
