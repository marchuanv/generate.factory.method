const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketResponseMessageFactoryContainer.singleton
* Create WebSocketResponseMessage
* @param {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketResponseMessage({factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketResponseMessage };
