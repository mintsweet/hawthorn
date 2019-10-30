#!/usr/local/bin/mongo hawthorn

// 清库
print('............ 开始：清空库 ............');
db.dropDatabase();
print('............ 结束：清空库 ............');

load('auth.js');
load('email.js');
load('threshold.js');
