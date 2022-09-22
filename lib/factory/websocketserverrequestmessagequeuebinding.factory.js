const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerRequestMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
