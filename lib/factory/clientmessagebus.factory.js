const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus}) {
    const ctorArgs = {factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createClientMessageBus };
