const factory = require('./factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContentSecurity } = require('C:\\component\\lib\\messagecontentsecurity.js');
/**
* Create MessageContentSecurity
* @param {data,recipientHost,recipientPort,metadata,senderHost,senderPort}
*/
function createMessageContentSecurity({data,recipientHost,recipientPort,metadata,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageContentSecurity, variableName:'messageContentSecurity', singleton: false });
    container.config({data,recipientHost,recipientPort,metadata,senderHost,senderPort});
    container.config(createMessageMetadata({recipientHost,recipientPort,metadata,senderHost,senderPort}));
container.config(createMessageContentMetadata({data}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContentSecurity };
