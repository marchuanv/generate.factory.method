const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({senderHost,senderPort,userId,data,token,metadata,messageStatusCode});
    factoryContainer.add(createMessageStatus({messageStatusCode}));
factoryContainer.add(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
factoryContainer.add(createMessageContent({userId,data,senderHost,senderPort,token,metadata}));
factoryContainer.add(createSenderAddress({senderHost,senderPort}));
    const message = new Message(factoryContainer);
    factoryContainer.add({message});
    return factoryContainer;
}
module.exports = { createMessage };
