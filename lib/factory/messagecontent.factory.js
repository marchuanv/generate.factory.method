const { FactoryContainer } = require('./factory.container.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
function createMessageContent({userId,data,senderHost,senderPort,token}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,data,senderHost,senderPort,token});
    factoryContainer.add(createMessageContentMetadata({data,senderHost,senderPort,token}));
factoryContainer.add(createEncryption({userId}));
    const messageContent = new MessageContent(factoryContainer);
    factoryContainer.add({messageContent});
    return factoryContainer;
}
module.exports = { createMessageContent };