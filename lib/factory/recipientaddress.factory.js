const factory = require('./factory.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientaddress.js');
/**
* IsSingleton: false 
* Create RecipientAddress 
* @param {scopeId,recipientHost,recipientPort}
*/
function createRecipientAddress({scopeId,recipientHost,recipientPort}) {
    let container = factory.getContainer({ scopeId, type: RecipientAddress, variableName:'recipientAddress' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: RecipientAddress, variableName:'recipientAddress', singleton: false });
        container.config({scopeId,recipientHost,recipientPort});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createRecipientAddress };
