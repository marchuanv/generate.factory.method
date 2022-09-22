const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientRequestMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
