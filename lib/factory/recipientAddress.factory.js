const factory = require('./factory.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientaddress.js');
/**
* IsSingleton: false 
* Create RecipientAddress 
* @param {recipientHost,recipientPort}
*/
function createRecipientAddress({recipientHost,recipientPort}) {
    const container = factory.createContainer({ type: RecipientAddress, variableName:'recipientAddress', singleton: false });
    container.config({recipientHost,recipientPort});
    
    container.initialise();
    return container.references;
}
module.exports = { createRecipientAddress };
