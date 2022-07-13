const { FactoryContainer } = require('./factory.container.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
function createSenderAddress({senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({senderHost,senderPort});
    
    const senderAddress = new SenderAddress(factoryContainer);
    factoryContainer.add({senderAddress});
    return factoryContainer;
}
module.exports = { createSenderAddress };
