const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
function createMessageContentMetadata({data,senderHost,senderPort,token,metadata}) {
    let container = new FactoryContainer();
    container.add({data,senderHost,senderPort,token,metadata});
    container.add(createSenderAddress({senderHost,senderPort}));
    const messageContentMetadata = new MessageContentMetadata(container);
    container.add({messageContentMetadata});
    return container;
}
module.exports = { createMessageContentMetadata };
