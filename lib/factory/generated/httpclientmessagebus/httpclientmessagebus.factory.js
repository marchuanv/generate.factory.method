const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientmessagebus//httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientMessageBus
* @param {timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpClientMessageBus({timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding} });
}
module.exports = { createHttpClientMessageBus };
