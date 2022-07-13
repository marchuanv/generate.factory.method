const { FactoryContainer } = require('./factory.container.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientAddress.js');
function createRecipientAddress({recipientHost,recipientPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({recipientHost,recipientPort});
    
    const recipientAddress = new RecipientAddress(factoryContainer);
    factoryContainer.add({recipientAddress});
    return factoryContainer;
}
module.exports = { createRecipientAddress };
