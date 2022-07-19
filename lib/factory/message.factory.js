const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    let container = factory.createContainer(Message);
    container.add({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createMessageStatus({messageStatusCode}));
container.add(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
container.add(createMessageContent({userId,data,senderHost,senderPort,token,metadata}));
container.add(createRecipientAddress({recipientHost,recipientPort}));
    const message = new Message(container);
    container.add({message});
    return container;
}
module.exports = { createMessage };
