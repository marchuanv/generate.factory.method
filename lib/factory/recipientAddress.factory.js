const factory = require('./factory.js');

const { RecipientAddress } = require('D:\\component\\lib\\recipientaddress.js');
/**
* Create RecipientAddress
* @param {recipientHost,recipientPort}
*/
function createRecipientAddress({recipientHost,recipientPort}) {
    const container = factory.createContainer({ type: RecipientAddress, variableName:'recipientAddress', singleton: false });
    container.config({recipientHost,recipientPort});
    
    container.complete();
    return container.references;
}
module.exports = { createRecipientAddress };
