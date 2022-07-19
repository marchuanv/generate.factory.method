const { FactoryContainer } = require('./factory.container.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientAddress.js');
function createRecipientAddress({recipientHost,recipientPort}) {
    let container = new FactoryContainer();
    container.add({recipientHost,recipientPort});
    
    const recipientAddress = new RecipientAddress(container);
    container.add({recipientAddress});
    return container;
}
module.exports = { createRecipientAddress };
