import http, { Response } from '@/utils/http';

export const queryAuditLog = (params: any): Promise<Response<any>> =>
  http.get('/audit-log', params);
