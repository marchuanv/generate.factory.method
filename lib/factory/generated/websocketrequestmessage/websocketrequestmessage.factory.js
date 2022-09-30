const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//websocketrequestmessage//websocketrequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketRequestMessage
* @param {factoryContainerBindingName}
*/
function createWebSocketRequestMessage({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketRequestMessage };
