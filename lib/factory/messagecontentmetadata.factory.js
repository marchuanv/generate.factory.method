const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
function createMessageContentMetadata({data,senderHost,senderPort,token,metadata}) {
    let container = factory.createContainer(MessageContentMetadata);
    container.add({data,senderHost,senderPort,token,metadata});
    container.add(createSenderAddress({senderHost,senderPort}));
    const messageContentMetadata = new MessageContentMetadata(container);
    container.add({messageContentMetadata});
    return container;
}
module.exports = { createMessageContentMetadata };
