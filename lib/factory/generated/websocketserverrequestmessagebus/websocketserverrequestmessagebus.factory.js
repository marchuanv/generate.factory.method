const { factory } = require('../../factory.js');

/**
* Create WebSocketServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketserverrequestmessagebus//websocketserverrequestmessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketServerRequestMessageBus };
