const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
