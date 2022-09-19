const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpResponseMessageFactoryContainer.singleton
* Create HttpResponseMessage
* @param {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpResponseMessage };
