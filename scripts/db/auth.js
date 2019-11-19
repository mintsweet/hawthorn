print('............ 开始：初始化用户组 ............');

db.auth_groups.insert({
  _id: ObjectId('5ae8a7378b225b8f18f5edb0'),
  name: 'ROOT',
  remark: '超级管理员',
  modifiable: false,
  permissions: [
    '/dashboard',
    '/auth',
    '/auth/group',
    '/auth/group/query',
    '/auth/group/create',
    '/auth/group/delete',
    '/auth/group/update',
    '/auth/user',
    '/auth/user/query',
    '/auth/user/create',
    '/auth/user/delete',
    '/auth/user/update',
    '/setting',
    '/setting/info',
    '/setting/dict',
    '/audit-logs',
  ],
});

db.auth_groups.insert({
  _id: ObjectId('5ae8a7378b225b8f18f5edb1'),
  name: 'TEST',
  remark: '测试',
  permissions: [
    '/dashboard',
    '/auth/group/query',
    '/auth/user/query',
    '/setting',
    '/setting/info',
    '/setting/dict',
  ],
});

db.auth_groups.insert({
  _id: ObjectId('5ae8a7378b225b8f18f5edb2'),
  name: 'GUEST',
  remark: '游客',
  permissions: [
    '/dashboard',
    '/setting',
    '/setting/info',
  ],
});

print('............ 结束：初始化用户组 ............');

print('............ 开始：初始化用户 ............');

db.auth_users.insert({
  username: 'admin',
  password: 'e52b9dadafadee9a3b14067253ff7262',
  nickname: '管理员',
  role: ObjectId('5ae8a7378b225b8f18f5edb0'),
});

db.auth_users.insert({
  username: 'test',
  password: 'e52b9dadafadee9a3b14067253ff7262',
  nickname: '测试',
  role: ObjectId('5ae8a7378b225b8f18f5edb1'),
});

db.auth_users.insert({
  username: 'guest',
  password: 'e52b9dadafadee9a3b14067253ff7262',
  nickname: '游客',
  role: ObjectId('5ae8a7378b225b8f18f5edb2'),
});

print('............ 结束：初始化用户 ............');
