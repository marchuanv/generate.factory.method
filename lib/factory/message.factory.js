const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
/**
* Create Message
* @param {recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}
*/
function createMessage({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    const container = factory.createContainer({ type: Message, variableName:'message', singleton: false });
    container.config({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageStatus({messageStatusCode}));
container.config(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
container.config(createMessageContent({userId,data,senderHost,senderPort,token,metadata}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessage };
