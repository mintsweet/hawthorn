export const errorCode = {
  0: '操作成功',

  10000: '用户名或密码错误',

  40000: '请求参数错误',
  40001: '尚未登录',
  40003: '客户端权限不足',
  40004: '请求资源不存在',

  50000: '服务器错误',
};

export const errorMsg = (code: number = 0): string => errorCode[code];
