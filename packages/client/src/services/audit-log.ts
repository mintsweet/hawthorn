import http from '@/utils/http';

/**
 * 审计日志
 */
export const getAuditLogs = (params: object) => http.get('/v1/audit-logs', params)
