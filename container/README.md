# Immortal AWS Lambda: Container Service

Contains Dockerfile defining an image which accepts 2 parameters via environment variables and executes an AWS Lambda function via `runner.js` executable.

Although the setup is based on Docker, the main target AWS service for making use of the setup is [AWS Fargate](https://aws.amazon.com/fargate/) because the majority of the other services around this service are based on the serverless framework.

This means that the main aim for this service to exist is to serve as a backup runner of an AWS Lambda handler in cases where the main AWS Lambda handler fails because of timeout.

## Updating Docker image

Run the following inside this folder:

```sh
$ docker build -t runner .
```

## Tag the latest image build

```sh
$ docker tag runner:latest {accountId}.dkr.ecr.eu-central-1.amazonaws.com/runner:latest
```

For more details on tagging and pushing and image to the AWS ECS repository, see this [tutorial](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html).

## Push the latest image to the repository

```sh
$ docker push {accountId}.dkr.ecr.eu-central-1.amazonaws.com/runner:latest
```

## Credentials

If pushing your image to the AWS ECS repository fails with the following message:

```
denied: Your Authorization Token has expired. Please run 'aws ecr get-login --no-include-email' to fetch a new one.
```

You can run the following command to re-take temporary credentials and use them directly without copy-paste:

```
$ aws ecr get-login --no-include-email | source /dev/stdin
```

If you still don't have the AWS CLI, please follow this [guide for installing it](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
