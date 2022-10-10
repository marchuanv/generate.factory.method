const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
