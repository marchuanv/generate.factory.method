const factory = require('./factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContentSecurity } = require('C:\\component\\lib\\messagecontentsecurity.js');
/**
* Create MessageContentSecurity
* @param {recipientHost,recipientPort,metadata,senderHost,senderPort}
*/
function createMessageContentSecurity({recipientHost,recipientPort,metadata,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageContentSecurity, variableName:'messageContentSecurity', singleton: false });
    container.config({recipientHost,recipientPort,metadata,senderHost,senderPort});
    container.config(createMessageMetadata({recipientHost,recipientPort,metadata,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContentSecurity };
