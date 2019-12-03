import Service from '@/core/baseService';
import Cache from '@/utils/cache';

export default class SettingDict extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.Dict;
  }

  DictCache = Cache({
    rs: this.app.redis,
    key: rowKey => `DICT:${rowKey}`,
    expire: 10,
    computed: async rowKey => {
      const result = await this.model
        .findOne({ key: rowKey })
        .lean();
      if (!result) {
        throw new Error(`dict ${rowKey} not found`);
      }
      return result.value;
    },
  });

  query() {
    return this.model
      .aggregate([])
      .group({
        _id: '$tag',
        dict: {
          $push: '$$ROOT',
        },
      });
  }

  getValue(key) {
    return this.DictCache(key);
  }
}
