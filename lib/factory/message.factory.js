const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\message.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageFactoryContainer.singleton
* Create Message
* @param {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessage({factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessage };
