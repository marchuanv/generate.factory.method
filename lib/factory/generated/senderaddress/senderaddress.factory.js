const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//senderaddress//senderaddress.factory.container.json');
const factory = new Factory(container);

/**
* Create SenderAddress
* @param {senderHost,senderPort,factoryContainerBindingName}
*/
function createSenderAddress({senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {senderHost,senderPort} });
}
module.exports = { createSenderAddress };
