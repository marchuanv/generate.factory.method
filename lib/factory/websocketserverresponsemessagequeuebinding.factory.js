const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
