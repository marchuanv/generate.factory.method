const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\websocketresponsemessage\\websocketresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketResponseMessageFactoryContainer.singleton
* Create WebSocketResponseMessage
* @param {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketResponseMessage({messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createWebSocketResponseMessage };
