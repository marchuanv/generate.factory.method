const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerResponseMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
