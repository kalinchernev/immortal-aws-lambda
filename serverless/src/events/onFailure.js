import AWS from "aws-sdk"; // eslint-disable-line import/no-extraneous-dependencies

import { extractTopic } from "../lib/extractors";
import getHandlerData from "../lib/getHandlerData";

export const handler = async (event, context, callback) => {
  const { RUNNER, SUBNET } = process.env;

  const ecs = new AWS.ECS();

  // Extract message
  const sqsRecord = event.Records ? event.Records[0] : undefined;

  const initialMessage = JSON.parse(sqsRecord.body);
  const topicArn = extractTopic(initialMessage);

  const handlerData = getHandlerData(topicArn);

  try {
    const runParams = {
      taskDefinition: RUNNER,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: "ENABLED",
          subnets: [SUBNET]
        }
      },
      overrides: {
        containerOverrides: [
          {
            environment: [
              {
                name: "AWS_LAMBDA_HANDLER_EVENT",
                value: JSON.stringify(initialMessage)
              },
              {
                name: "AWS_LAMBDA_HANDLER_CONTEXT",
                value: JSON.stringify(context)
              },
              {
                name: "AWS_LAMBDA_HANDLER_NAME",
                value: handlerData.name
              },
              {
                name: "AWS_LAMBDA_HANDLER_PATH",
                value: handlerData.path
              }
            ],
            name: RUNNER
          }
        ]
      }
    };

    const result = await ecs.runTask(runParams).promise();
    return callback(null, result);
  } catch (e) {
    return callback(e);
  }
};

export default handler;
