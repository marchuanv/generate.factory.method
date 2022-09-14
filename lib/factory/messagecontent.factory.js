const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContentFactoryContainer } = require('C:\\component\\lib\\factory\\messagecontent.container.json');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.prototype.js');

/**
* IsSingleton: MessageContentFactoryContainer.singleton
* Create MessageContent
* @param {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const { scopeId } = args;
    const binding = MessageContentFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageContentFactoryContainer);
}
module.exports = { createMessageContent };
