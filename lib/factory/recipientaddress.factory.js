const { Factory } = require('../factory.js');
const factory = new Factory();

const { RecipientAddress } = require('C:\\component\\lib\\recipientaddress.prototype.js');
const getRecipientAddressFactoryConfig = require('C:\\component\\lib\\factory\\recipientaddress.factory.config.js');
/**
* IsSingleton: false 
* Create RecipientAddress 
* @param {scopeId,recipientHost,recipientPort}
*/
function createRecipientAddress({scopeId,recipientHost,recipientPort}) {
    const container = factory.getContainer({ scopeId, type: RecipientAddress, variableName:'recipientAddress', singleton: false });
    container.config(getRecipientAddressFactoryConfig());
    container.reference({recipientHost,recipientPort});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createRecipientAddress };
