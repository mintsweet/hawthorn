import { Controller } from 'egg';

export default class SettingDict extends Controller {
  async query(ctx) {
    const result = await ctx.service.setting.dict.query();
    return ctx.success({
      data: result,
    });
  }

  async get(ctx) {
    const { key } = ctx.params;
    const result = await ctx.service.setting.dict.getValue(key);
    return ctx.success({
      data: result,
    });
  }

  async update(ctx) {
    const { key } = ctx.params;

    const result = await ctx.service.setting.dict
      .updateOne({ key }, ctx.request.body);

    if (!result) {
      return ctx.notFound({
        data: key,
      });
    }

    return ctx.success({
      data: result,
    });
  }
}
