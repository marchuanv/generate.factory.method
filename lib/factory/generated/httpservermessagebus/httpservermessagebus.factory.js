const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpservermessagebus//httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBus
* @param {timeout,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding,httpServerStoppedMessageQueueBinding,senderAddress,logger,factoryContainerBindingName}
*/
function createHttpServerMessageBus({timeout,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding,httpServerStoppedMessageQueueBinding,senderAddress,logger,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding,httpServerStoppedMessageQueueBinding,senderAddress,logger} });
}
module.exports = { createHttpServerMessageBus };
