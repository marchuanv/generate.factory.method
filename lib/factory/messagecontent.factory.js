const { Factory } = require('../factory.js');
const { MessageContentFactoryContainer } = require('C:\\component\\lib\\factory\\messagecontent.factory.container.json');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.prototype.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');

const factory = new Factory(MessageContentFactoryContainer);

/**
* IsSingleton: MessageContentFactoryContainer.singleton
* Create MessageContent
* @param {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = MessageContentFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createMessageContent };
