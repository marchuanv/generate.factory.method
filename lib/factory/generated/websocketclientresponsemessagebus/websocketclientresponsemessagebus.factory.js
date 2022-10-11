const { factory } = require('../../factory.js');

/**
* Create WebSocketClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketclientresponsemessagebus//websocketclientresponsemessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketClientResponseMessageBus };
