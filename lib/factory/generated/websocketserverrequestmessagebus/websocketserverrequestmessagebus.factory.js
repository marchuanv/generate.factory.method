const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverrequestmessagebus//websocketserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketServerRequestMessageBus };
