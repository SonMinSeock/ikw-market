#!/bin/bash

ENV_FILE="/home/ubuntu/build/server/.env"

# 디렉토리와 파일 생성
mkdir -p "$(dirname "$ENV_FILE")"
touch "$ENV_FILE"

# 파일에 내용 추가
echo "MONGO_URI=$(aws ssm get-parameter --name MONGO_URI --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
echo "JWT_SECRET_KEY=$(aws ssm get-parameter --name JWT_SECRET_KEY --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
echo "REDIS_HOST=$(aws ssm get-parameter --name REDIS_HOST --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
echo "REDIS_PORT=$(aws ssm get-parameter --name REDIS_PORT --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
echo "REDIS_USERNAME=$(aws ssm get-parameter --name REDIS_USERNAME --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
echo "REDIS_PASSWORD=$(aws ssm get-parameter --name REDIS_PASSWORD --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
