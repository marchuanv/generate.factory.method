const factory = require('./factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* IsSingleton: false 
* Create MessageContent 
* @param {data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageContent({ scopeId, data,recipientHost,recipientPort,metadata,token,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createUserSessions({}));
container.config(createMessageContentMetadata({data}));
    container.initialise();
    return container.references;
}
module.exports = { createMessageContent };
