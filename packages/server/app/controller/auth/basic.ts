import { Controller } from 'egg';
import * as md5 from 'md5';
import rbac from '@/rbac';
import { loginRule } from '@/validate/auth/basic';

export default class AuthBasicController extends Controller {
  async systemTree(ctx) {
    ctx.success({
      data: rbac,
    });
  }

  async login(ctx) {
    const { username, password } = ctx.request.body;

    try {
      ctx.validate(loginRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const { saltPassword } = ctx.app.config;

    const { _id: id, nickname } = await ctx.model.AuthUser.findOne({
      account: username,
      password: md5(`${saltPassword}${password}`),
    });

    if (!id) {
      return ctx.badRequest({
        code: 10001,
      });
    }

    ctx.login({
      id,
      username,
      nickname,
    });

    return ctx.success({
      data: id,
    });
  }

  async logout(ctx) {
    ctx.logout();
    ctx.success();
  }

  async userInfo(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unauthorized({
        data: ctx.user,
      });
    }

    const { id } = ctx.user;

    const result = await ctx.model.AuthUser.findById(id, '-_id -createdAt -updateAt password');

    return ctx.success({
      data: {
        ...result,
        id: ctx.user.id,
      },
    });
  }
}
