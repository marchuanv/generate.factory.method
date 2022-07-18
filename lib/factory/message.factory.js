const { FactoryContainer } = require('./factory.container.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createMessageStatus({messageStatusCode}));
factoryContainer.add(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
factoryContainer.add(createMessageContent({userId,data,senderHost,senderPort,token,metadata}));
factoryContainer.add(createRecipientAddress({recipientHost,recipientPort}));
    const message = new Message(factoryContainer);
    factoryContainer.add({message});
    return factoryContainer;
}
module.exports = { createMessage };
