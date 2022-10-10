const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientresponsemessagebus//websocketclientresponsemessagebus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create WebSocketClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketClientResponseMessageBus };
