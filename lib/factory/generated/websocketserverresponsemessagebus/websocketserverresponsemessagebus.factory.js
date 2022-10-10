const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverresponsemessagebus//websocketserverresponsemessagebus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create WebSocketServerResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketServerResponseMessageBus };
