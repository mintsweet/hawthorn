# API 列表

## 语言更新

`/api/v1/lang`

### 请求方式

```
PUT
```

### 参数

| 参数  | 是否必选 |  类型  |   说明   |
| :---: | :------: | :----: | :------: |
| lang  |   Yes    | string | 语言类型 |

### 返回示例

```
无
```

## 登录

`/api/v1/login`

### 请求方式

```
POST
```

### 参数

|   参数   | 是否必选 |  类型  |  说明  |
| :------: | :------: | :----: | :----: |
| username |   Yes    | string | 用户名 |
| password |   Yes    | string |  密码  |

### 返回示例

```json
{
  "userId": "xxxx",
  "uri": "/dashboard"
}
```

## 登出

`/api/v1/logout`

### 请求方式

```
POST
```

### 参数

```
无
```

### 返回示例

```
无
```

## 获取用户信息

`/api/v1/info`

### 请求方式

```
GET
```

### 请求参数

```
无
```

### 返回示例

```json
{
  "username": "admin",
  "passwordStrength": "strong",
  "nickname": "管理员",
  "avatar": "xxx",
  "permissions": [],
  "siderbar": []
}
```

## 更新用户信息

`/api/v1/info`

### 请求方式

```
PUT
```

### 请求参数

|   参数   | 是否必选 |  类型  | 说明  |
| :------: | :------: | :----: | :---: |
| nickname |    NO    | string | 昵称  |

### 返回示例

```json
{
  "nickname": "新昵称"
}
```

## 更新用户密码

`/api/v1/password`

### 请求方式

```
PUT
```

### 请求参数

|  参数   | 是否必选 |  类型  |  说明  |
| :-----: | :------: | :----: | :----: |
| oldPass |   YES    | string | 旧密码 |
| newPass |   YES    | string | 新密码 |

### 返回示例

```json
{
  "passwordStrength": "medium"
}
```

## 获取权限组

`/api/v1/auth/groups`

### 请求方法

```
GET
```

### 参数

|   参数    | 是否必选 |  类型  |   说明   |
| :-------: | :------: | :----: | :------: |
|   page    |    NO    | number |   页码   |
|   size    |    NO    | number |   页数   |
| condition |    NO    | object | 其他条件 |

### 返回示例

```json
{
  "list": [],
  "total": 0,
  "page": 1,
  "size": 10,
}
```

## 筛选权限组

`/api/v1/auth/groups/search`

### 请求方法

```
GET
```

### 参数

| 参数  | 是否必选 |  类型  |    说明    |
| :---: | :------: | :----: | :--------: |
| name  |    NO    | string | 名称部分值 |

### 返回示例

```json
[
  {
    "_id": "xxx",
    "name": "xxx"
  },
  {
    "_id": "xxx",
    "name": "xxx"
  }
]
```

## 创建权限组

`/api/v1/auth/group`

### 请求方法

```
POST
```

### 参数

|    参数     | 是否必选 |  类型  |   说明   |
| :---------: | :------: | :----: | :------: |
|    name     |   YES    | string |   名称   |
|   remark    |    NO    | string |   备注   |
| permissions |   YES    | array  | 权限列表 |

### 返回示例

```json
xxxxxx
```

## 删除权限组

`/api/v1/auth/group/:id`

### 请求方法

```
DELETE
```

### 参数

```
无
```

### 返回示例

```json
xxxxxx
```

## 修改权限组

`/api/v1/auth/group/:id`

### 请求方法

```
PUT
```

### 参数

|    参数     | 是否必选 |  类型  |   说明   |
| :---------: | :------: | :----: | :------: |
|   remark    |    NO    | string |   备注   |
| permissions |    NO    | array  | 权限列表 |

### 返回示例

```json
xxxxxx
```

## 获取系统权限树

`/api/v1/auth/system-tree`

### 请求方法

```
GET
```

### 参数

```
无
```

### 返回示例

```json
[
  {
    "path": "/dashboard",
    "icon": "dashboard",
    "menu": true,
    "name": "数据概览"
  }
]
```

## 获取用户列表

`/api/v1/auth/users`

### 请求方法

```
GET
```

### 参数

|   参数    | 是否必选 |  类型  |   说明   |
| :-------: | :------: | :----: | :------: |
|   page    |    NO    | number |   页码   |
|   size    |    NO    | number |   页数   |
| condition |    NO    | object | 其他条件 |

### 返回示例

```json
{
  "list": [],
  "total": 0,
  "page": 1,
  "size": 10,
}
```

## 创建用户

`/api/v1/auth/user`

### 请求方法

```
POST
```

### 参数

|   参数    | 是否必选 |   类型    |    说明    |
| :-------: | :------: | :-------: | :--------: |
| usernamae |   YES    |  string   |   用户名   |
| password  |   YES    |  string   |    密码    |
|   role    |   YES    | object_id | 所属权限组 |
| nickname  |    NO    |  string   |    昵称    |

### 返回示例

```json
xxxxx
```

## 删除用户

`/api/v1/auth/user/:id`

### 请求方法

```
DELETE
```

### 参数

```
无
```

### 返回示例

```json
xxxxx
```

## 修改用户

`/api/v1/auth/user/:id`

### 请求方法

```
PUT
```

### 参数

|   参数   | 是否必选 |   类型    |    说明    |
| :------: | :------: | :-------: | :--------: |
| password |    NO    |  string   |    密码    |
|   role   |    NO    | object_id | 所属权限组 |
| nickname |    NO    |  string   |    昵称    |

### 返回示例

```json
xxxxx
```

## 获取字典

`/api/v1/setting/dicts`

### 请求方法

```
GET
```

### 参数

```
无
```

### 返回示例

```json
[]
```

## 根据字典KEY获取值

`/api/v1/setting/dict/:key`

### 请求方法

```
GET
```

### 参数

```
无
```

### 返回示例

```json
{}
```

## 根据字典KEY修改值

`/api/v1/setting/dict/:key`

### 请求方法

```
PUT
```

### 参数

| 参数  | 是否必选 | 类型  |  说明  |
| :---: | :------: | :---: | :----: |
| value |   YES    |  any  | 字典值 |

### 返回示例

```json
{}
```

## 获取审计日志

`/api/v1/audit-logs`

### 请求方法

```
GET
```

### 参数

|   参数    | 是否必选 |  类型  |   说明   |
| :-------: | :------: | :----: | :------: |
|   page    |    NO    | number |   页码   |
|   size    |    NO    | number |   页数   |
| condition |    NO    | object | 其他条件 |

### 返回示例

```json
{
  "list": [],
  "total": 0,
  "page": 1,
  "size": 10,
}
```
