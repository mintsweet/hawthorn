import Service from '@/core/base_service';

export default class SettingDict extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.Dict;
  }

  async query() {
    const result = await this.model
      .aggregate([])
      .group({
        _id: '$tag',
        dict: {
          $push: '$$ROOT',
        },
      });
    return result;
  }
}
