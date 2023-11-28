#!/bin/bash

ENV_FILE="server/.env"

# Check if .env file exists, if not, create it
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# Append MONGO_URI to .env file
echo "MONGO_URI=$(aws ssm get-parameter --name MONGO_URI --query 'Parameter.Value' --output text)" >> "$ENV_FILE"
