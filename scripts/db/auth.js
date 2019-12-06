print('............ 开始：初始化超级管理员 ............');

db.auth_groups.insert({
  _id: ObjectId('5ae8a7378b225b8f18f5edb0'),
  name: 'ROOT',
  remark: '',
  modifiable: false,
  permissions: [
    '/dashboard',
    '/auth',
    '/auth/group',
    '/auth/group/create',
    '/auth/group/delete',
    '/auth/group/update',
    '/auth/user',
    '/auth/user/create',
    '/auth/user/delete',
    '/auth/user/update',
    '/setting',
    '/setting/info',
    '/setting/dict',
    '/audit-logs',
  ],
});

db.auth_users.insert({
  username: 'admin',
  password: 'e52b9dadafadee9a3b14067253ff7262',
  nickname: '',
  role: ObjectId('5ae8a7378b225b8f18f5edb0'),
});

print('............ 结束：初始化超级管理员 ............');
