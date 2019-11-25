import http from '@/utils/http';

/**
 * 常规
 */
export const updateLang = (data: object) => http.put('/v1/lang', data);
