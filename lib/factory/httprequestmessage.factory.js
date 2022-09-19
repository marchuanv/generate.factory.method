const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httprequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpRequestMessageFactoryContainer.singleton
* Create HttpRequestMessage
* @param {factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpRequestMessage };
