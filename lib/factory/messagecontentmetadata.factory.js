const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
function createMessageContentMetadata({data,senderHost,senderPort,token,metadata}) {
    const container = factory.createContainer({ type: MessageContentMetadata, variableName:'messageContentMetadata' });
    container.config({data,senderHost,senderPort,token,metadata});
    container.config(createSenderAddress({senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContentMetadata };
