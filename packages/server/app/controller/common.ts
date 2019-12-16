import { Controller } from 'egg';

export default class CommonController extends Controller {
  updateLang(ctx) {
    let { lang } = ctx.request.body;
    lang = lang.toLowerCase();

    if (!ctx.app.config.supportLang.includes(lang)) {
      return ctx.badRequest({
        code: 10000,
      });
    }

    ctx.cookies.set('locale', lang);
    return ctx.success();
  }
}
