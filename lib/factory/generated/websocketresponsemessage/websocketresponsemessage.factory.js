const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketresponsemessage//websocketresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketResponseMessage
* @param {message,factoryContainerBindingName}
*/
function createWebSocketResponseMessage({message,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {message} });
}
module.exports = { createWebSocketResponseMessage };
