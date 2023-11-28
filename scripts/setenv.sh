#!/bin/bash

ENV_FILE="/home/ubuntu/build/server/.env"

# 디렉토리와 파일 생성
mkdir -p "$(dirname "$ENV_FILE")"
touch "$ENV_FILE"

# 파일에 내용 추가
echo "MONGO_URI=$(aws ssm get-parameter --name MONGO_URI --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
