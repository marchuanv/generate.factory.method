const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.js');
/**
* IsSingleton: false 
* Create MessageMetadata 
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({ scopeId, recipientHost,recipientPort,metadata,token,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config({recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.initialise();
    return container.references;
}
module.exports = { createMessageMetadata };
