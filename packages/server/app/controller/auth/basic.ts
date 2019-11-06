import { Controller } from 'egg';
import * as md5 from 'md5';
import { cloneDeep, flattenDeep, uniq } from 'lodash';
import rbac from '@/rbac';
import { loginRule } from '@/validate/auth/basic';

const filterRBAC = (data: any, has: any[]) => {
  const result: any = [];

  data.forEach(item => {
    if (has.includes(item.path) && item.menu) {
      if (item.routes) {
        item.routes = filterRBAC(item.routes, has);
      }
      result.push(item);
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
        code: 10000,
      });
    }

    // Record login audit log
    await this.app.auditLog.log(ctx, {
      operationType: '消息',
      operationContent: `用户登录-${username}`,
    });

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
      return ctx.unAuthorized();
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
      data: filterRBAC(cloneDeep(rbac), flatAuth),
    });
  }
}
