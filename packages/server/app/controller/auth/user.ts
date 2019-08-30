import { Controller } from 'egg';
import { pick } from 'lodash';
import { createRule, updateRule } from '@/validate/auth/user';

export default class UserController extends Controller {
  async index(ctx) {
    const query = ctx.request;

    const where = pick(query, [ 'username' ]);

    const result = await ctx.service.auth.user.getPage(query.page, query.size, where);

    ctx.success({
      data: {
        ...result,
        list: result.list.map(obj => {
          return pick(obj, [ '_id', 'username' ]);
        }),
      },
    });
  }

  async create(ctx) {
    const { body } = ctx.request;

    try {
      ctx.validate(createRule);
    } catch (err) {
      ctx.badRequest({ data: err.errors });
      return;
    }

    const userExist = await ctx.service.auth.user.getOne({
      username: body.username,
    });

    if (userExist) {
      ctx.badRequest({
        code: 10002,
        data: {
          username: body.username,
        },
      });
      return;
    }

    const result = await ctx.service.auth.user.create(pick(body, Object.keys(createRule)));

    if (result) {
      ctx.success({
        data: {
          id: result._id,
        },
      });
    }
  }

  async delete(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.user.delete(id);

    if (!result) {
      ctx.notFound({
        code: 10003,
        data: {
          id,
        },
      });

      return;
    }

    ctx.success({
      data: {
        id,
      },
    });
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    try {
      ctx.validate(updateRule);
    } catch (err) {
      ctx.badRequest({ data: err.errors });
      return;
    }

    const result = await ctx.service.auth.user.update(id, pick(body, Object.keys(updateRule)));

    if (!result) {
      ctx.notFound({
        code: 10003,
        data: {
          id,
        },
      });
      return;
    }

    ctx.success({
      data: {
        id: result._id,
      },
    });
  }

  async get(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.user.getById(id);

    if (!result) {
      ctx.notFound({
        code: 10003,
        data: {
          id,
        },
      });

      return;
    }

    ctx.success({
      data: result,
    });
  }

  async search(ctx) {
    const { name } = ctx.query;

    const result = await ctx.service.auth.user.search(name);

    ctx.success({
      data: result.map(obj => {
        const temp = pick(obj, [ '_id', 'username' ]);
        return {
          _id: temp._id,
          name: temp.username,
        };
      }),
    });
  }
}
