print('............ 开始：初始化邮件发送配置 ............');

db.dicts.insert({
  key: 'EMAIL_HOST',
  tag: '邮件发送配置',
  note: '主机',
  value: '',
  type: 'string',
});

db.dicts.insert({
  key: 'EMAIL_PORT',
  tag: '邮件发送配置',
  note: '端口',
  value: NumberInt(465),
  type: 'number',
});

db.dicts.insert({
  key: 'EMAIL_USER',
  tag: '邮件发送配置',
  note: '账号',
  value: '',
  type: 'string',
});

db.dicts.insert({
  key: 'EMAIL_PASSWORD',
  tag: '邮件发送配置',
  note: '密码',
  value: '',
  type: 'string',
});

db.dicts.insert({
  key: 'EMAIL_SECURE',
  tag: '邮件发送配置',
  note: '使用安全连接（TLS/SSL）',
  value: true,
  type: 'boolean',
});

db.dicts.insert({
  key: 'EMAIL_SENDER_NAME',
  tag: '邮件发送配置',
  note: '发送者名称',
  value: '',
  type: 'string',
});

db.dicts.insert({
  key: 'EMAIL_SENDER_ADDRESS',
  tag: '邮件发送配置',
  note: '发送者邮箱地址',
  value: '',
  type: 'string',
});

print('............ 结束：初始化邮件发送配置 ............');
