import { Controller } from 'egg';
import { pick } from 'lodash';
import { createRule, updateRule } from '@/validate/auth/user';

export default class AuthUserController extends Controller {
  async query(ctx) {
    const { page, size, ...condition } = ctx.query;

    const result = await ctx.service.auth.user.getPage(
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

    const userExist = await ctx.service.auth.user.getOne({
      username: body.username,
    });

    if (userExist) {
      return ctx.badRequest({
        code: 10002,
        data: {
          username: body.username,
        },
      });
    }

    const result = await ctx.service.auth.user.create(pick(body, Object.keys(createRule)));

    if (result) {
      return ctx.success({
        data: result._id,
      });
    }
  }

  async delete(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.user.delete(id);

    if (!result) {
      ctx.notFound({
        code: 10003,
        data: id,
      });

      return;
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

    const result = await ctx.service.auth.user.update(id, pick(body, Object.keys(updateRule)));

    if (!result) {
      return ctx.notFound({
        code: 10003,
        data: id,
      });
    }

    return ctx.success({
      data: result._id,
    });
  }

  async get(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.user.getById(id);

    if (!result) {
      return ctx.notFound({
        code: 10003,
        data: id,
      });
    }

    return ctx.success({
      data: result,
    });
  }

  async search(ctx) {
    const { name } = ctx.query;

    const result = await ctx.service.auth.user.search(name);

    return ctx.success({
      data: result.map(obj => {
        const { _id, username } = pick(obj, [ '_id', 'username' ]);
        return {
          id: _id,
          name: username,
        };
      }),
    });
  }
}
