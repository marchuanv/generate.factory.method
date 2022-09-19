const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\senderaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: SenderAddressFactoryContainer.singleton
* Create SenderAddress
* @param {factoryContainerBindingName,senderHost,senderPort}
*/
function createSenderAddress({factoryContainerBindingName,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createSenderAddress };
