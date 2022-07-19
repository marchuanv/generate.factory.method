const factory = require('./factory.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
function createSenderAddress({senderHost,senderPort}) {
    let container = factory.createContainer(SenderAddress);
    container.add({senderHost,senderPort});
    
    const senderAddress = new SenderAddress(container);
    container.add({senderAddress});
    return container;
}
module.exports = { createSenderAddress };
