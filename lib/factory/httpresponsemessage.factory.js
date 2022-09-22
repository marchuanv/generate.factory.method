const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpResponseMessageFactoryContainer.singleton
* Create HttpResponseMessage
* @param {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode,factoryContainerBindingName,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createHttpResponseMessage };
