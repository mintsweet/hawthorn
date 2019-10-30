print('............ 开始：初始化阈值设置 ............');

db.dicts.insert({
  key: 'THRESHOLD_LOGIN_ERROR',
  tag: '阈值设置',
  note: '登录操作错误阈值，设置为 0 关闭限制功能',
  value: NumberInt(5),
  type: 'number',
});

print('............ 结束：初始化阈值设置 ............');

