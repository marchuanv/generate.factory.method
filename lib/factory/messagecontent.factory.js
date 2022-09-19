const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagecontent.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentFactoryContainer.singleton
* Create MessageContent
* @param {factoryContainerBindingName,scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({factoryContainerBindingName,scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {factoryContainerBindingName,scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = MessageContentFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createMessageContent };
