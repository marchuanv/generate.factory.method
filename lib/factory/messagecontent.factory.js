const factory = require('./factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createSharedUserSessions } = require('C:\\component\\lib\\factory\\sharedusersessions.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort}
*/
function createMessageContent({data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort});
    container.config(createMessageMetadata({recipientHost,recipientPort,metadata,userId,senderHost,senderPort}));
container.config(createSharedUserSessions({}));
container.config(createMessageContentMetadata({data}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
