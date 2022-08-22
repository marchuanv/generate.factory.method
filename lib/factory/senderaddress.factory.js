const factory = require('./factory.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
/**
* IsSingleton: false 
* Create SenderAddress 
* @param {scopeId,senderHost,senderPort}
*/
function createSenderAddress({scopeId,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: SenderAddress, variableName:'senderAddress', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: SenderAddress, variableName:'senderAddress', singleton: false });
        container.config({scopeId,senderHost,senderPort});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createSenderAddress };
