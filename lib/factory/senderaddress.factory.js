const factory = require('./factory.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
/**
* Create SenderAddress
* @param {senderHost,senderPort}
*/
function createSenderAddress({senderHost,senderPort}) {
    const container = factory.createContainer({ type: SenderAddress, variableName:'senderAddress', singleton: false });
    container.config({senderHost,senderPort});
    
    container.complete();
    return container.references;
}
module.exports = { createSenderAddress };
