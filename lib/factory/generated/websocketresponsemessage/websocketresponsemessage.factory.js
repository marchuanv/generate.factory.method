const { factory } = require('../../factory.js');

/**
* Create WebSocketResponseMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createWebSocketResponseMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketresponsemessage//websocketresponsemessage.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createWebSocketResponseMessage };
