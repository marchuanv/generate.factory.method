const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
function createMessageContentMetadata({data,senderHost,senderPort,token,metadata}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({data,senderHost,senderPort,token,metadata});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
    const messageContentMetadata = new MessageContentMetadata(factoryContainer);
    factoryContainer.add({messageContentMetadata});
    return factoryContainer;
}
module.exports = { createMessageContentMetadata };
