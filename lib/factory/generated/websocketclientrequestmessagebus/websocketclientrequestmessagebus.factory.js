const factory = require('../../factory.js');

/**
* Create WebSocketClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketclientrequestmessagebus//websocketclientrequestmessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketClientRequestMessageBus };
