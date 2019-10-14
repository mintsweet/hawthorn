import Service from '@/core/base_service';

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }
}
