const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\servermessagebus\\servermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ServerMessageBusFactoryContainer.singleton
* Create ServerMessageBus
* @param {serverResponseMessageBus,serverRequestMessageBus}
*/
function createServerMessageBus({serverResponseMessageBus,serverRequestMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {serverResponseMessageBus,serverRequestMessageBus} });
}
module.exports = { createServerMessageBus };
