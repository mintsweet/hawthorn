import Service from '@/core/baseService';

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }

  async getPage(page = 1, size = 10, query = {}) {
    const total = await this.model.find(query).countDocuments();
    const list = await this.model
      .aggregate([])
      .match(query)
      .skip((+page - 1) * size)
      .limit(+size)
      .lookup({
        from: 'auth_groups',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      })
      .unwind({
        path: '$role',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        roleName: '$role.name',
      })
      .project({
        role: 0,
      });

    return {
      list,
      total,
      page,
      size,
    };
  }
}
