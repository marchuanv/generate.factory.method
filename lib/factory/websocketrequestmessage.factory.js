const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketRequestMessageFactoryContainer.singleton
* Create WebSocketRequestMessage
* @param {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketRequestMessage({messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createWebSocketRequestMessage };
