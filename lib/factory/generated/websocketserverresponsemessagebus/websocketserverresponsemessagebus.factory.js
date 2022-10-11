const { Factory } = require('../../factory.js');

/**
* Create WebSocketServerResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketserverresponsemessagebus//websocketserverresponsemessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketServerResponseMessageBus };
