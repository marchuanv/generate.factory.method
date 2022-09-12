const { Factory } = require('../factory.js');
const factory = new Factory();

const { RecipientAddress } = require('C:\\component\\lib\\recipientaddress.js');
/**
* IsSingleton: false 
* Create RecipientAddress 
* @param {scopeId,recipientHost,recipientPort}
*/
function createRecipientAddress({scopeId,recipientHost,recipientPort}) {
    let container = factory.getContainer({ scopeId, type: RecipientAddress, variableName:'recipientAddress', singleton: false });
    container.config({recipientHost,recipientPort});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createRecipientAddress };
