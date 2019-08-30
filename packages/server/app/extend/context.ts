export interface Response {
  status?: number;
  code?: number;
  msg?: string;
  data?: object;
}

module.exports = {
  success({ status = 200, code = 0, msg = '', data = {} }: Response = {}): void {
    this.status = status;
    this.body = {
      code,
      msg,
      data,
    };
  },

  badRequest({ status = 400, code = 20001, msg = '', data = {} }): void {
    this.status = status;
    this.body = {
      code,
      msg,
      data,
    };
  },
};
