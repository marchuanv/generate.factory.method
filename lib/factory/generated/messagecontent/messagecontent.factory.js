const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\messagecontent\\messagecontent.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentFactoryContainer.singleton
* Create MessageContent
* @param {factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageContent };
