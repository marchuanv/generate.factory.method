const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({clientRequestMessageBus,clientResponseMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {clientRequestMessageBus,clientResponseMessageBus} });
}
module.exports = { createClientMessageBus };
