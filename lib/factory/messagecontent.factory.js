const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagecontent.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentFactoryContainer.singleton
* Create MessageContent
* @param {factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageContent };
