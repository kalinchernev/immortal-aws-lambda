# Immortal AWS Lambda: Serverless Service

This is a simple serverless service which other services can call when they fail because of timeout limitations.

It provides `LambdaFailureQueue` SQS resource which others can queue failures to.

Then, the `onFailure` will process the failures by running the code of the original failing lambda function in another compute service which does not have timeout limitations.
