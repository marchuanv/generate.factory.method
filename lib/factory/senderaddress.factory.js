const { Factory } = require('../factory.js');
const factory = new Factory();

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.prototype.js');
const getSenderAddressFactoryConfig = require('C:\\component\\lib\\factory\\senderaddress.factory.config.js');
/**
* IsSingleton: false 
* Create SenderAddress 
* @param {scopeId,senderHost,senderPort}
*/
function createSenderAddress({scopeId,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: SenderAddress, variableName:'senderAddress', singleton: false });
    container.config(getSenderAddressFactoryConfig());
    container.reference({senderHost,senderPort});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createSenderAddress };
