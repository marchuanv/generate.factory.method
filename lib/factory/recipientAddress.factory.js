const factory = require('./factory.js');

const { RecipientAddress } = require('C:\\component\\lib\\recipientAddress.js');
function createRecipientAddress({recipientHost,recipientPort}) {
    let container = factory.createContainer(RecipientAddress);
    container.add({recipientHost,recipientPort});
    
    const recipientAddress = new RecipientAddress(container);
    container.add({recipientAddress});
    return container;
}
module.exports = { createRecipientAddress };
