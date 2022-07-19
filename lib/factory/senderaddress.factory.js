const factory = require('./factory.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
function createSenderAddress({senderHost,senderPort}) {
    const container = factory.createContainer({ type: SenderAddress, variableName:'senderAddress' });
    container.config({senderHost,senderPort});
    
    container.complete();
    return container.references;
}
module.exports = { createSenderAddress };
