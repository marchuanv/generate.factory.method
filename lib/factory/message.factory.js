const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
/**
* Create Message
* @param {recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort}
*/
function createMessage({recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort}) {
    const container = factory.createContainer({ type: Message, variableName:'message', singleton: false });
    container.config({recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageStatus({messageStatusCode}));
container.config(createMessageMetadata({metadata}));
container.config(createMessageContentMetadata({data}));
container.config(createMessageContent({data,userId,metadata}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessage };
