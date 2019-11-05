import Service from '@/core/baseService';

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }
}
