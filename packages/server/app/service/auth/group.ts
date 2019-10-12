import Service from '@/core/base_service';

export default class AuthGroupService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthGroup;
  }
}
