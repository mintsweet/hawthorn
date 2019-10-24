export interface Response {
  status?: number;
  code?: number;
  msg?: string;
  data?: object;
}

module.exports = {
  success({
    status = 200,
    code = 0,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },

  badRequest({
    status = 400,
    code = 40000,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },

  unAuthorized({
    status = 401,
    code = 40001,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },

  forbidden({
    status = 403,
    code = 40003,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },

  notFound({
    status = 404,
    code = 40004,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },

  failure({
    status = 500,
    code = 50000,
    msg = '',
    data = {},
  }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
  },
};
