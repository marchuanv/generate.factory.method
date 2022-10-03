const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketrequestmessage//websocketrequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketRequestMessage
* @param {message,factoryContainerBindingName}
*/
function createWebSocketRequestMessage({message,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {message} });
}
module.exports = { createWebSocketRequestMessage };
