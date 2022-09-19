const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
