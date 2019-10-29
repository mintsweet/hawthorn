import { Controller } from 'egg';
import { pick } from 'lodash';
import rbac from '@/rbac';
import { createRule, updateRule } from '@/validate/auth/group';

export default class AuthGroupController extends Controller {
  async systemTree(ctx) {
    ctx.success({
      data: rbac,
    });
  }

  async query(ctx) {
    const { page, size, ...condition } = ctx.query;

    const result = await ctx.service.auth.group.getPage(
      page,
      size,
      condition,
    );

    return ctx.success({
      data: result,
    });
  }

  async create(ctx) {
    const { body } = ctx.request;

    try {
      ctx.validate(createRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const groupExist = await ctx.service.auth.group.getOne({
      name: body.name,
    });

    if (groupExist) {
      return ctx.badRequest({
        code: 10002,
        data: {
          name: body.name,
        },
      });
    }

    const result = await ctx.service.auth.group.create(pick(body, Object.keys(createRule)));

    if (result) {
      return ctx.success({
        data: result._id,
      });
    }
  }

  async delete(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.group.delete(id);

    if (!result) {
      return ctx.notFound({
        code: 10003,
        data: id,
      });
    }

    return ctx.success({
      data: id,
    });
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    try {
      ctx.validate(updateRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const group = await ctx.service.auth.group.getById(id);

    if (!group) {
      return ctx.notFound({
        code: 10003,
        data: id,
      });
    }

    if (!group.modifiable) {
      return ctx.badRequest({
        code: 10003,
        data: id,
      });
    }

    const result = await ctx.service.auth.group.update(id, pick(body, Object.keys(updateRule)));

    return ctx.success({
      data: result._id,
    });
  }
}
