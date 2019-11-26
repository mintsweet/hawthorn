import { Controller } from 'egg';
import { pick, cloneDeep } from 'lodash';
import rbac from '@/rbac';
import { createRule, updateRule } from '@/validate/auth/group';

const spliceRbacName = (data: any, ctx: any) => {
  const result: any = [];

  data.forEach(item => {
    if (item.routes) {
      item.routes = spliceRbacName(item.routes, ctx);
    }
    result.push({
      name: ctx.__(`rbac.${item.path}`),
      ...item,
    });
  });

  return result;
};

export default class AuthGroupController extends Controller {
  async systemTree(ctx) {
    return ctx.success({
      data: spliceRbacName(cloneDeep(rbac), ctx),
    });
  }

  async query(ctx) {
    const { page, size, ...condition } = ctx.query;

    const result = await ctx.service.auth.group
      .getPage(
        page,
        size,
        condition,
      );

    return ctx.success({
      data: result,
    });
  }

  async create(ctx) {
    const { name } = ctx.request.body;

    try {
      ctx.validate(createRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const groupExist = await ctx.service.auth.group
      .getOne({
        name,
      });

    if (groupExist) {
      return ctx.badRequest({
        code: 10001,
        data: {
          name,
        },
      });
    }

    const result = await ctx.service.auth.group
      .create(pick(ctx.request.body, Object.keys(createRule)));

    if (result) {
      return ctx.success({
        data: result._id,
      });
    }
  }

  async delete(ctx) {
    const { id } = ctx.params;

    const group = await ctx.service.auth.group.getById(id);

    if (!group) {
      return ctx.notFound({
        data: id,
      });
    }

    if (!group.modifiable) {
      return ctx.badRequest({
        code: 11101,
        data: id,
      });
    }

    await ctx.service.auth.group.delete(id);

    return ctx.success({
      data: id,
    });
  }

  async update(ctx) {
    const { id } = ctx.params;

    try {
      ctx.validate(updateRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const group = await ctx.service.auth.group.getById(id);

    if (!group) {
      return ctx.notFound({
        data: id,
      });
    }

    if (!group.modifiable) {
      return ctx.badRequest({
        code: 11101,
        data: id,
      });
    }

    const result = await ctx.service.auth.group
      .update(id, pick(ctx.request.body, Object.keys(updateRule)));

    return ctx.success({
      data: result._id,
    });
  }

  async search(ctx) {
    const { name = '' } = ctx.query;

    const result = await ctx.service.auth.group.search(name);

    return ctx.success({
      data: result,
    });
  }
}
