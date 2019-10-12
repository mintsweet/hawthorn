import { Controller } from 'egg';
import rbac from '@/rbac';

export default class AuthBasicController extends Controller {
  async systemTree(ctx) {
    ctx.success({
      data: rbac,
    });
  }
}
