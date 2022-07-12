const { FactoryContainer } = require('./factory.container.js');

const { SenderAddress } = require('C:\\component\\lib\\senderaddress.js');
function createSenderAddress({host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port});
    
    const senderAddress = new SenderAddress(factoryContainer);
    factoryContainer.add({senderAddress});
    return factoryContainer;
}
module.exports = { createSenderAddress };
