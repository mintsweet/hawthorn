import Service from '@/core/baseService';

export default class AuthGroupService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthGroup;
  }
}
