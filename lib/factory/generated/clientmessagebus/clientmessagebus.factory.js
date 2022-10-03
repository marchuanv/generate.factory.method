const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//clientmessagebus//clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create ClientMessageBus
* @param {messageConverter,clientRequestMessageBus,clientResponseMessageBus,factoryContainerBindingName}
*/
function createClientMessageBus({messageConverter,clientRequestMessageBus,clientResponseMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageConverter,clientRequestMessageBus,clientResponseMessageBus} });
}
module.exports = { createClientMessageBus };
