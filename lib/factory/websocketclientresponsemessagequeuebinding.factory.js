const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketClientResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
