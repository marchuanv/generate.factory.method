const { FactoryContainer } = require('./factory.container.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
function createSenderAddress({senderHost,senderPort}) {
    let container = new FactoryContainer();
    container.add({senderHost,senderPort});
    
    const senderAddress = new SenderAddress(container);
    container.add({senderAddress});
    return container;
}
module.exports = { createSenderAddress };
