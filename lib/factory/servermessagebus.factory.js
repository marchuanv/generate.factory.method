const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\servermessagebus.factory.container.json');
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
