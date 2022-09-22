const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\senderaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: SenderAddressFactoryContainer.singleton
* Create SenderAddress
* @param {senderHost,senderPort}
*/
function createSenderAddress({senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {senderHost,senderPort} });
}
module.exports = { createSenderAddress };
