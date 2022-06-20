FROM public.ecr.aws/lambda/nodejs:16

# LAMBDA_TASK_ROOT variable is provided by above base image
WORKDIR ${LAMBDA_TASK_ROOT}

# Copying files to a working directory for lambda
COPY . .

ARG env_name
ENV mode=$env_name
RUN echo "$env_name"

# Installing only prod dependencies
RUN npm install --only=prod --unsafe-perm=true 


# Lambda handler function path 'handler' function in index.js file
CMD [ "index.handler" ]

# docker buildx create --use

# docker buildx build --build-arg env_name=prod -t 210535004255.dkr.ecr.ap-south-1.amazonaws.com/digital-pdf:latest --platform linux/arm64 --push .

# aws lambda --region ap-south-1 update-function-code --function-name digital-pdf-generator --image-uri 210535004255.dkr.ecr.ap-south-1.amazonaws.com/digital-pdf:latest --architectures arm64 --publish