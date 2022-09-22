const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httprequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpRequestMessageFactoryContainer.singleton
* Create HttpRequestMessage
* @param {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createHttpRequestMessage };
