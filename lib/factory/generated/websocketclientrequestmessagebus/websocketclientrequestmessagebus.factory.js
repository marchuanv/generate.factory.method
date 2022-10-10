const { Factory } = require('../../factory.js');

/**
* Create WebSocketClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketclientrequestmessagebus//websocketclientrequestmessagebus.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketClientRequestMessageBus };
