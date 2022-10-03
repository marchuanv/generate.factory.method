const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientresponsemessagequeuebinding//websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketClientResponseMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
