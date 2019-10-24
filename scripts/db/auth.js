print('............ 开始：初始化用户组 ............');

db.auth_groups.insert({
  _id: ObjectId('5ae8a7378b225b8f18f5edb8'),
  name: 'ROOT',
  remark: '超级管理员',
  permissions: [
    '/auth',
    '/auth/group',
    '/auth/user',
  ],
});

print('............ 结束：初始化用户组 ............');

print('............ 开始：初始化用户 ............');

db.auth_users.insert({
  username: 'admin',
  password: 'e52b9dadafadee9a3b14067253ff7262',
  nickname: '管理员',
  role: ObjectId('5ae8a7378b225b8f18f5edb8'),
});

print('............ 结束：初始化用户 ............');
