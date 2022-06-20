#! /bin/bash

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 210535004255.dkr.ecr.ap-south-1.amazonaws.com

docker buildx build --build-arg env_name=$1 -t 210535004255.dkr.ecr.ap-south-1.amazonaws.com/digital-pdf:latest --platform linux/arm64 --push

aws lambda --region ap-south-1 update-function-code --function-name digital-pdf-generator --image-uri 210535004255.dkr.ecr.ap-south-1.amazonaws.com/digital-pdf:latest --architectures arm64 --publish