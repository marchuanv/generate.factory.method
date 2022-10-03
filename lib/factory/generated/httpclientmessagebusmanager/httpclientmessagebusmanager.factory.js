const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientmessagebusmanager//httpclientmessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientMessageBusManager
* @param {httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpClientMessageBusManager({httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding} });
}
module.exports = { createHttpClientMessageBusManager };
