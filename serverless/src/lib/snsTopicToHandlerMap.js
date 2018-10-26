/**
 * How to find the keys:
 *
 * - They are SNS topics names without stage prefix.
 * - In the service, next to the sns event subscription, there's `topicName`, take it without the prefix.
 *
 * How to find the values for the object with `name` and `path` keys:
 *
 * - `name` is the service name concatenated with the handler name
 * - `path` is the physical path to the handler's source code as of the root of the service.
 */

const snsTopicToHandlerMap = {
  topic1: {
    name: "foo",
    path: "bar"
  }
};

export default snsTopicToHandlerMap;
