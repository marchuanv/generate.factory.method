const { FactoryContainer } = require('./factory.container.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
function createMessageContent({userId,data,senderHost,senderPort,token,metadata}) {
    let container = new FactoryContainer();
    container.add({userId,data,senderHost,senderPort,token,metadata});
    container.add(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
container.add(createEncryption({userId}));
    const messageContent = new MessageContent(container);
    container.add({messageContent});
    return container;
}
module.exports = { createMessageContent };
