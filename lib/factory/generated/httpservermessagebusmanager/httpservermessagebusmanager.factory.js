const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpservermessagebusmanager//httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBusManager
* @param {httpServerStoppedMessageQueueBinding,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({httpServerStoppedMessageQueueBinding,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpServerStoppedMessageQueueBinding,httpServerRequestMessageQueueBinding,httpServerResponseMessageQueueBinding,httpServerStartMessageQueueBinding,httpServerStartedMessageQueueBinding,httpServerStopMessageQueueBinding} });
}
module.exports = { createHttpServerMessageBusManager };
