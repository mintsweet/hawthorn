import { Controller } from 'egg';
import * as md5 from 'md5';
import rbac from '@/rbac';
import { loginRule } from '@/validate/auth/basic';

const filterRBAC = (data: any, has: string[]) => {
  const result: any = [];

  data.forEach(item => {
    if (has.includes(item.path)) {
      if (item.routes) {
        item.routes = filterRBAC(item.routes, has);
      }
      result.push(item);
    }
  });

  return result;
};

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
        code: 10000,
      });
    }

    ctx.login({
      id: user._id,
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

  async userInfo(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unAuthorized({
        data: ctx.user ? ctx.user._id : '',
      });
    }

    const [ user ] = await ctx.model.AuthUser
      .aggregate([])
      .match({
        username: ctx.user.username,
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
        roleName: '$role.name',
        roleRemark: '$role.remark',
      })
      .project({
        role: 0,
      });

    return ctx.success({
      data: user,
    });
  }

  async siderbar(ctx) {
    if (!ctx.isAuthenticated()) {
      return ctx.unAuthorized({
        data: ctx.user ? ctx.user._id : '',
      });
    }

    const siderbar = filterRBAC(rbac, ctx.user.permissions);

    return ctx.success({
      data: siderbar,
    });
  }
}
