#!/bin/bash

# 复制文件
copyFiles() {
  echo "正在拷贝 package.json"
  cp ./package.json ../../build
  echo "正在拷贝 tsconfig.json"
  cp ./tsconfig.json ../../build
  echo "正在拷贝 app/view 模板目录"
  cp -a ./app/view ../../build/app
  echo "正在拷贝 config/locale 国际化目录"
  cp -a ./config/locale ../../build/config
  echo "正在拷贝 migrations 数据库初始化目录"
  cp -a ./migrations ../../build
  echo "正在拷贝 yarn.lock"
  cp ../../yarn.lock ../../build
}

# 开始
startTime=`date +"%Y-%m-%d %H:%M:%S"`
echo "-----开始打包($startTime)-----"

# 文件清理
echo "-----文件清理：开始-----"
rm -rf build
mkdir build
echo "-----文件清理：结束-----"

# 执行 ts 编译
echo "-----SERVER TS文件编译：开始-----"
cd packages/server
yarn tsc
echo "-----SERVER TS文件编译：结束-----"

# 文件拷贝
echo "-----SERVER 文件拷贝：开始-----"
copyFiles
cd ../..
echo "-----SERVER 文件拷贝：结束-----"

# node_modules 安装
echo "-----SERVER 依赖安装：开始-----"
cd build
yarn
cd ..
echo "-----SERVER 依赖安装：结束-----"

# client 打包
echo "-----CLIENT 打包静态文件：开始-----"
cd packages/client
NODE_ENV=production yarn build
cd ../../
echo "-----CLIENT 打包静态文件：结束-----"

# Docker 镜像构建
echo "-----DOCKER 镜像构建：开始-----"
docker build -t hawthorn:v1 .
echo "-----DOCKER 镜像构建：结束-----"

endTime=`date +"%Y-%m-%d %H:%M:%S"`
echo "-----打包完成($endTime)-----"
