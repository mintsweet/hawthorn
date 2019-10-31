import http from '@/utils/http';

/**
 * 字典
 */
export const getDicts = () => http.get('/v1/setting/dicts');
export const getDict = (key: string) => http.get(`/v1/setting/dict/${key}`);
export const updateDict = (key: string, data: object) => http.put(`/v1/setting/dict/${key}`, data);
