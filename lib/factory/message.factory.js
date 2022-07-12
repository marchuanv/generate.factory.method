const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({host,port,userId,data,token,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port,userId,data,token,messageStatusCode});
    factoryContainer.add(createMessageStatus({messageStatusCode}));
factoryContainer.add(createMessageContentMetadata({data,host,port,token}));
factoryContainer.add(createMessageContent({userId,data,host,port,token}));
factoryContainer.add(createSenderAddress({host,port}));
    const message = new Message(factoryContainer);
    factoryContainer.add({message});
    return factoryContainer;
}
module.exports = { createMessage };
