import { Controller } from 'egg';

export default class AuditLog extends Controller {
  async query(ctx) {
    const { page = 1, size = 10, ...condition } = ctx.query;

    const total = await this.app.auditLog
      .count(condition);

    const list = await this.app.auditLog
      .find(condition)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * size)
      .limit(+size);

    return ctx.success({
      data: {
        list,
        total,
        page,
        size,
      },
    });
  }
}
