import { Controller } from 'egg';
import * as md5 from 'md5';
import { cloneDeep, flattenDeep, uniq, pick } from 'lodash';
import rbac from '@/rbac';
import {
  loginRule,
  updateUserInfoRule,
  updateUserPasswordRule,
} from '@/validate/auth/basic';

// 根据权限列表过滤菜单树
const filterRBAC = (data: any, has: any[], ctx: any) => {
  const result: any = [];

  data.forEach(item => {
    if (has.includes(item.path) && item.menu) {
      if (item.routes) {
        item.routes = filterRBAC(item.routes, has, ctx);
      }
      result.push({
        name: ctx.__(`rbac.${item.path}`),
        ...item,
      });
    }
  });

  return result;
};

export default class AuthBasicController extends Controller {
  async login(ctx) {
    const { username, password } = ctx.request.body;

    try {
      ctx.validate(loginRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const { saltPassword } = ctx.app.config;

    const [ user ] = await ctx.model.AuthUser
      .aggregate([])
      .match({
        username,
        password: md5(`${saltPassword}${password}`),
      })
      .lookup({
        from: 'auth_groups',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      })
      .unwind({
        path: '$role',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        permissions: '$role.permissions',
      })
      .project({
        role: 0,
      });

    if (!user || !user._id) {
      return ctx.badRequest({
        code: 11000,
      });
    }

    // Record login audit log
    await this.app.auditLog.log(ctx, {
      operationType: 'Login',
      operationContent: username,
    });

    ctx.login({
      _id: user._id,
      username: user.username,
      permissions: user.permissions,
    });

    return ctx.success({
      data: {
        userId: user._id,
        uri: user.permissions[0],
      },
    });
  }

  async logout(ctx) {
    ctx.logout();
    ctx.success();
  }

  async getUserInfo(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unAuthorized();
    }

    const user = await ctx.service.auth.user
      .getById(ctx.user._id)
      .select('nickname avatar');

    if (!user || !user._id) {
      return ctx.unAuthorized();
    }

    const flatAuth = uniq(
      flattenDeep(
        ctx.user.permissions.map(item => {
          const urlList = item.split('/').filter(Boolean);
          return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
        }),
      ),
    );

    return ctx.success({
      data: {
        ...user.toObject(),
        ...ctx.user,
        siderbar: filterRBAC(cloneDeep(rbac), flatAuth, ctx),
      },
    });
  }

  async updateUserInfo(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unAuthorized();
    }

    const { body } = ctx.request;
    const { id, username } = ctx.user;

    try {
      ctx.validate(updateUserInfoRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const user = await ctx.service.auth.user
      .update(id, pick(body, Object.keys(updateUserInfoRule)))
      .select('-_id nickname avatar');

    // Record update user info audit log
    await this.app.auditLog.log(ctx, {
      operationType: 'Update User Info',
      operationContent: username,
    });

    return ctx.success({
      data: user,
    });
  }

  async updateUserPassword(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unAuthorized();
    }

    const { oldPass, newPass } = ctx.request.body;

    try {
      ctx.validate(updateUserPasswordRule);
    } catch (err) {
      return ctx.badRequest({ data: err.errors });
    }

    const { saltPassword } = ctx.app.config;
    const { _id, username } = ctx.user;

    const user = await ctx.service.auth.user
      .getOne({ username, password: md5(`${saltPassword}${oldPass}`) });

    if (!user || !user._id) {
      return ctx.badRequest({
        code: 11001,
      });
    }

    await ctx.service.auth.user
      .update(_id, { password: md5(`${saltPassword}${newPass}`) });

    return ctx.success();
  }
}
