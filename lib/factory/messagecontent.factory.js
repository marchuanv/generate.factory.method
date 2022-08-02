const factory = require('./factory.js');
const { createMessageContentSecurity } = require('C:\\component\\lib\\factory\\messagecontentsecurity.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {data,recipientHost,recipientPort,metadata,senderHost,senderPort}
*/
function createMessageContent({data,recipientHost,recipientPort,metadata,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,recipientHost,recipientPort,metadata,senderHost,senderPort});
    container.config(createMessageContentSecurity({data,recipientHost,recipientPort,metadata,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
