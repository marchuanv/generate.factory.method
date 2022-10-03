const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//websocketclientresponsemessagequeuebinding//websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
