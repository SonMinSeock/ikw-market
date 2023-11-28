#!/bin/bash

echo "MONGO_URI=$(aws ssm get-parameter --name MONGO_URI --query 'Parameter.Value' --output text)" | sudo tee -a server/.env

