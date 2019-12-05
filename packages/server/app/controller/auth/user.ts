import { Controller } from 'egg';
import { pick } from 'lodash';
import * as md5 from 'md5';
import { createRule, updateRule } from '@/validate/auth/user';

export default class AuthUserController extends Controller {
  async query(ctx) {
    const { page, size, ...condition } = ctx.query;

    const result = await ctx.service.auth.user
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
    const { username, password } = ctx.request.body;

    try {
      ctx.validate(createRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const userExist = await ctx.service.auth.user
      .getOne({
        username,
      });

    if (userExist) {
      return ctx.badRequest({
        code: 11200,
        data: {
          username,
        },
      });
    }

    const result = await ctx.service.auth.user
      .create(pick({ ...ctx.request.body, password: md5(password) }, Object.keys(createRule)));

    if (result) {
      return ctx.success({
        data: result._id,
      });
    }
  }

  async delete(ctx) {
    const { id } = ctx.params;
    const { _id } = ctx.user;

    if (id === _id) {
      return ctx.badRequest({
        code: 11201,
      });
    }

    const result = await ctx.service.auth.user.delete(id);

    if (!result) {
      return ctx.notFound({
        data: id,
      });
    }

    return ctx.success({
      data: id,
    });
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { password } = ctx.request.body;

    try {
      ctx.validate(updateRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    let newPass;

    if (password) {
      const { saltPassword } = ctx.app.config;
      newPass = md5(`${saltPassword}${password}`);
    }

    const result = await ctx.service.auth.user
      .update(id, pick({ ...ctx.request.body, password: newPass }, Object.keys(updateRule)));

    if (!result) {
      return ctx.notFound({
        data: id,
      });
    }

    return ctx.success({
      data: result._id,
    });
  }
}
