const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//messagemetadata//messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageMetadata
* @param {recipientAddress,metadata,token,senderAddress,factoryContainerBindingName}
*/
function createMessageMetadata({recipientAddress,metadata,token,senderAddress,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {recipientAddress,metadata,token,senderAddress} });
}
module.exports = { createMessageMetadata };
