const factory = require('./factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* IsSingleton: false 
* Create MessageContent 
* @param {scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: MessageContent, variableName:'messageContent' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageContent, variableName:'messageContent', singleton: false });
        container.config({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
            container.config(createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createUserSessions({scopeId}));
container.config(createMessageContentMetadata({scopeId,data}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageContent };
