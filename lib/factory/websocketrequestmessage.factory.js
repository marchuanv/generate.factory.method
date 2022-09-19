const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketRequestMessageFactoryContainer.singleton
* Create WebSocketRequestMessage
* @param {factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketRequestMessage({factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketRequestMessage };
