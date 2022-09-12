const { Factory } = require('../factory.js');
const factory = new Factory();

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
/**
* IsSingleton: false 
* Create SenderAddress 
* @param {scopeId,senderHost,senderPort}
*/
function createSenderAddress({scopeId,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: SenderAddress, variableName:'senderAddress', singleton: false });
    container.config({senderHost,senderPort});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createSenderAddress };
