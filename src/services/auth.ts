import http, { Response } from '@/utils/http';
import { AuthModuleItem } from '@/store/auth';

export const getSiderbar = (): Promise<Response<AuthModuleItem[]>> =>
  http.get('/api/siderbar');
