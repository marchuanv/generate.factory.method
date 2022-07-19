const factory = require('./factory.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientAddress.js');
function createRecipientAddress({recipientHost,recipientPort}) {
    const container = factory.createContainer({ type: RecipientAddress, variableName:'recipientAddress' });
    container.config({recipientHost,recipientPort});
    
    container.complete();
    return container.references;
}
module.exports = { createRecipientAddress };
