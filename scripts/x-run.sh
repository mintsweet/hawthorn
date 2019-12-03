#!/bin/bash

# Docker 镜像启动
echo "-----DOCKER 镜像启动：开始-----"
docker-compose up -d
echo "-----DOCKER 镜像启动：结束-----"

# MongoDB 初始化
echo "-----MongoDB 初始化：开始-----"
docker cp scripts/db hawthorn-mongo:/tmp/
docker exec -it hawthorn-mongo bash -c 'cd /tmp/db && mongo mongodb://127.0.0.1/hawthorn?readPreference=primary index.js'
echo "-----MongoDB 初始化：结束-----"
