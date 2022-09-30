const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//clientmessagebus//clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create ClientMessageBus
* @param {clientRequestMessageBus,clientResponseMessageBus,factoryContainerBindingName}
*/
function createClientMessageBus({clientRequestMessageBus,clientResponseMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {clientRequestMessageBus,clientResponseMessageBus} });
}
module.exports = { createClientMessageBus };
