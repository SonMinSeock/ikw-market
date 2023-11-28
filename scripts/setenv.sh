#!/bin/bash

filename="server/.env"

# .env 파일 생성
touch $filename

# .env 파일에 덮어쓰기
echo "MONGO_URI=$(aws ssm get-parameter --name MONGO_URI --query 'Parameter.Value' --output text)" >> $filename