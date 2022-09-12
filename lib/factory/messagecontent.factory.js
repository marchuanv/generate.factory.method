const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.prototype.js');
const getMessageContentFactoryConfig = require('C:\\component\\lib\\factory\\messagecontent.factory.config.js');
/**
* IsSingleton: false 
* Create MessageContent 
* @param {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: MessageContent, variableName:'messageContent', singleton: false });
    container.config(getMessageContentFactoryConfig());
    container.reference({data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.reference(createUserSessions({scopeId}));
container.reference(createMessageContentMetadata({scopeId,data}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageContent };
