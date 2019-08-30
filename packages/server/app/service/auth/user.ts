import Service from '@/core/base_service';

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }

  async search(name) {
    const result = await this.model.find({
      username: {
        $regex: name,
      },
    });
    return result;
  }
}
