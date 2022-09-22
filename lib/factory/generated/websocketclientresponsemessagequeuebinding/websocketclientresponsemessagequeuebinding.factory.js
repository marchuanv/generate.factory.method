const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\websocketclientresponsemessagequeuebinding\\websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
