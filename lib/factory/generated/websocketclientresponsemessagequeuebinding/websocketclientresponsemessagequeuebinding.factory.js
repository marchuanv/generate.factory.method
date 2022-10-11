const { Factory } = require('../../factory.js');

/**
* Create WebSocketClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketclientresponsemessagequeuebinding//websocketclientresponsemessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
