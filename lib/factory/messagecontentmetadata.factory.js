const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
function createMessageContentMetadata({data,host,port,token}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({data,host,port,token});
    factoryContainer.add(createSenderAddress({host,port}));
    const messageContentMetadata = new MessageContentMetadata(factoryContainer);
    factoryContainer.add({messageContentMetadata});
    return factoryContainer;
}
module.exports = { createMessageContentMetadata };
