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
    const result = await ctx.service.setting.dict.getOne({ key });
    return ctx.success({
      data: result,
    });
  }

  async update(ctx) {
    const { key } = ctx.params;
    const { body } = ctx.request;

    const result = await ctx.service.setting.dict.updateOne({ key }, body);
    return ctx.success({
      data: result,
    });
  }
}
